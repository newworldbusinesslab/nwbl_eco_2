import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { catalog, cardGroups, publishedCards } from "../src/data/ecosystemCards";
import { lessons } from "../src/data/lessons";
import { entrance, tourScenes } from "../src/data/tour";
import { visualSlots, visualSlotsById } from "../src/data/visualSlots";
import { LabMedia } from "../src/components/visuals/LabMedia";
import { findTopics } from "../src/lib/guide-directory";
import { answerGuide } from "../src/lib/guide-server";

function question(text: string, origin = "https://lab.example") {
  return new Request("https://lab.example/api/guide", { method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify({ question: text }) });
}

test("catalog identities, routes, lesson references and visual slots resolve", () => {
  const ids = new Set(catalog.map(card => card.id));
  expect(ids.size).toBe(catalog.length);
  expect(new Set(cardGroups.map(group => group.id)).size).toBe(cardGroups.length);
  expect(new Set(publishedCards.map(card => card.route)).size).toBe(publishedCards.length);
  expect(visualSlotsById.size).toBe(visualSlots.length);
  for (const card of catalog) {
    if (card.visualSlotId) expect(visualSlotsById.has(card.visualSlotId)).toBeTruthy();
    if (card.visibility === "public") expect(card.route).toMatch(/^\/[a-z0-9/-]+$/);
  }
  for (const lesson of lessons) {
    for (const id of [lesson.from, ...lesson.appliesTo]) expect(ids.has(id)).toBeTruthy();
    if (lesson.status === "verified") expect(lesson.evidence).toMatch(/^(https:\/\/|\/)/);
  }
  for (const asset of [entrance, ...tourScenes, ...visualSlots]) {
    const bytes = readFileSync(join("public", asset.assetPath));
    expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
    expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
    for (const source of asset.video ?? []) expect(existsSync(join("public", source.src))).toBeTruthy();
    if (asset.captions) expect(existsSync(join("public", asset.captions))).toBeTruthy();
  }
});

test("stills render without video and configured motion keeps its poster and captions", () => {
  const still = renderToStaticMarkup(<LabMedia asset={entrance} alt="Entrance" />);
  expect(still).toContain("<img"); expect(still).not.toContain("<video");
  const motion = renderToStaticMarkup(<LabMedia alt="Entrance" asset={{ ...entrance,
    video: [{ src: "/test.webm", type: "video/webm" }, { src: "/test.mp4", type: "video/mp4" }], captions: "/test.vtt" }} />);
  for (const tag of ["<video", "controls", 'preload="none"', 'poster="'+entrance.assetPath+'"', "/test.webm", "/test.mp4", "/test.vtt"]) expect(motion).toContain(tag);
  expect(motion).not.toMatch(/autoplay/i);
});

test("free-text guide finds proof ventures, intake, and an honest unknown answer", async () => {
  expect(findTopics("How do I start with an idea?")[0].id).toBe("start");
  expect(findTopics("Tell me about Soul Forge Studio")[0].id).toBe("soul-forge-studio");
  expect(findTopics("What is the quantum bridge?")[0].id).toBe("quantum-bridge");
  expect(findTopics("Tell me more about that", "front-street")[0].id).toBe("front-street");
  const reply = await (await answerGuide(question("polar penguins"), {}, async () => false)).json();
  expect(reply.mode).toBe("directory"); expect(reply.links).toEqual([]); expect(reply.answer).toContain("don’t have");
});

test("live answers use only public matching entries and directory fallback survives provider failure", async () => {
  const settings = { PUKA_API_KEY: "fixture-only", PUKA_MODEL: "fixture-model" };
  const live = await answerGuide(question("Front Street"), settings, async () => true, async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    expect(body.store).toBe(false);
    expect(body.input).not.toMatch(/internalPipeline|connectedEngine|fixture-only/);
    return Response.json({ output: [{ type: "message", content: [{ type: "output_text", text: "Test answer" }] }] });
  });
  expect((await live.json()).mode).toBe("live");
  const unavailable = async () => { throw new Error("provider unavailable"); };
  for (const allow of [true, false]) {
    const fallback = await answerGuide(question("Front Street"), settings, async () => allow, unavailable);
    expect((await fallback.json()).mode).toBe("directory");
  }
  expect((await answerGuide(question("A".repeat(510)), {}, async () => false)).status).toBe(400);
  expect((await answerGuide(question("Hi", "https://another.example"), {}, async () => false)).status).toBe(403);
});
