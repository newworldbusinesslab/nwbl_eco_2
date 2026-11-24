import { directoryReply, findTopics } from "./guide-directory";

export type GuideSettings = { PUKA_API_KEY?: string; PUKA_MODEL?: string };
type OutputItem = { type: string; content?: { type: string; text?: string }[] };
type Quota = () => Promise<boolean>;
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

async function readQuestion(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return;
  const reader = request.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let size = 0, text = "";
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.length;
    if (size > 4096) { await reader.cancel(); return; }
    text += decoder.decode(part.value, { stream: true });
  }
  try {
    const data = JSON.parse(text + decoder.decode());
    if (typeof data?.question !== "string") return;
    const question = data.question.trim();
    if (question && question.length <= 500) return { question, previous: typeof data.previous === "string" ? data.previous : undefined };
  } catch { /* Invalid JSON has the same response as an invalid question. */ }
}

export async function answerGuide(request: Request, settings: GuideSettings, allowLive: Quota, providerFetch: typeof fetch = fetch) {
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Use the guide on the Lab website." }, 403);
  const input = await readQuestion(request);
  if (!input) return json({ error: "Enter a question of up to 500 characters." }, 400);
  const matches = findTopics(input.question, input.previous);
  const local = directoryReply(matches);
  if (!settings.PUKA_API_KEY || !settings.PUKA_MODEL || !matches.length) return json(local);
  try {
    if (!await allowLive()) return json(local);
    const response = await providerFetch("https://api.openai.com/v1/responses", {
      method: "POST", signal: AbortSignal.timeout(10000),
      headers: { Authorization: "Bearer " + settings.PUKA_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: settings.PUKA_MODEL, store: false, max_output_tokens: 350,
        instructions: "You are Puka, the New World Business Lab tour guide. Answer concisely using only the supplied public directory entries. Acknowledge missing facts. Preserve project status, proposed versus verified results, and simulation versus hardware. Never claim to have taken action. Return plain text without links. The interface supplies verified links.",
        input: JSON.stringify({ question: input.question, directory: matches.map(({ title, answer }) => ({ title, answer })) }),
      }),
    });
    if (response.ok) {
      const result = await response.json();
      const answer = (result.output as OutputItem[] | undefined)?.filter(item => item.type === "message")
        .flatMap(item => item.content ?? []).filter(part => part.type === "output_text")
        .map(part => part.text).join(" ").trim();
      if (answer) return json({ ...local, mode: "live", answer: answer.slice(0, 2400) });
    }
  } catch { /* A provider, timeout, or quota-store failure leaves the directory available. */ }
  return json(local);
}
