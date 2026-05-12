"use client";

import { useEffect, useState } from "react";
import { VisualAssetFrame } from "@/components/visuals/VisualAssetFrame";

const scenes = [
  {
    phase: "WELCOME",
    title: "I’m Mrs. Kapu AI Ukalani.",
    text: "Let’s build the future together.",
    image: "/images/hero/kapu-scene-1.webp",
  },
  {
    phase: "STAND",
    title: "We rise to create impact.",
    text: "The Lab comes online.",
    image: "/images/hero/kapu-scene-2.webp",
  },
  {
    phase: "TRANSFORM",
    title: "From potential to purpose.",
    text: "Vision becomes structure.",
    image: "/images/hero/kapu-scene-3.webp",
  },
  {
    phase: "PREPARE",
    title: "Excellence is in the details.",
    text: "Every system gets sharpened.",
    image: "/images/hero/kapu-scene-4.webp",
  },
  {
    phase: "EXPLORE",
    title: "Innovation in every step.",
    text: "Walk through the Lab.",
    image: "/images/hero/kapu-scene-5.webp",
  },
  {
    phase: "INSPIRE",
    title: "The future is not waiting.",
    text: "Let’s build it.",
    image: "/images/hero/kapu-scene-6.webp",
  },
];

export function HeroVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % scenes.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const scene = scenes[active];

  return (
    <VisualAssetFrame
      label="Mrs. Kapu AI Ukalani"
      description="Animated homepage introduction for the New World Business Lab landing experience."
    >
      <div className="relative mt-5 min-h-[520px] overflow-hidden rounded-2xl border border-cyan-300/20 bg-black shadow-2xl">
        {scenes.map((item, index) => (
          <div
            key={item.phase}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              index === active
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

        <div className="absolute left-5 top-5 rounded-xl border border-red-500/30 bg-black/50 px-4 py-3 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.28em] text-red-400">
            NWBL
          </p>
          <p className="text-sm font-semibold text-cyan-100">
            New World Business Lab
          </p>
        </div>

        <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {scene.phase}
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-white md:text-5xl">
              {scene.title}
            </h2>
            <p className="mt-2 max-w-xl text-base text-zinc-300">
              {scene.text}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-black/55 p-3 backdrop-blur-md">
            <div className="mb-3 flex gap-2">
              {scenes.map((item, index) => (
                <button
                  key={item.phase}
                  onClick={() => setActive(index)}
                  className={`h-2.5 w-8 rounded-full transition ${
                    index === active ? "bg-red-500" : "bg-cyan-200/25"
                  }`}
                  aria-label={`Show ${item.phase} scene`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
              <span>AI & Data</span>
              <span>Automation</span>
              <span>Smart Systems</span>
              <span>Global Impact</span>
            </div>
          </div>
        </div>
      </div>
    </VisualAssetFrame>
  );
}
