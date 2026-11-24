"use client";

import { useEffect, useRef, useState } from "react";
import { VisualAssetFrame } from "./VisualAssetFrame";
import { LabMedia } from "./LabMedia";
import { tourScenes } from "@/data/tour";

export function HeroVisual() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const scene = tourScenes[active];

  useEffect(() => {
    const target = frame.current;
    if (paused || scene.video?.length || !target || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) setPaused(true);
    let visible = false;
    let timer: number | undefined;
    function update() {
      window.clearInterval(timer);
      if (visible && !document.hidden && !motion.matches) {
        timer = window.setInterval(() => setActive(i => (i + 1) % tourScenes.length), 6000);
      }
    }
    function motionChanged() {
      if (motion.matches) setPaused(true);
      update();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.25 });
    observer.observe(target);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", motionChanged);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", motionChanged);
    };
  }, [paused, scene]);

  function select(index: number) { setPaused(true); setActive(index); }

  return <VisualAssetFrame label="Mrs. Kapu AI Ukalani" description="A walkthrough of New World Business Lab with Puka.">
    <div className="mt-5 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black" ref={frame}>
      <div className="relative isolate">
        <LabMedia key={scene.phase} asset={scene} alt={scene.alt}
          className="block aspect-video w-full object-cover object-center" />
        {!scene.video?.length && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />}
      </div>
      <div className="grid gap-5 px-5 pb-6 pt-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{scene.phase}</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">{scene.title}</h2>
          <p className="mt-2 text-base text-zinc-300">{scene.text}</p>
        </div>
        <div>
          <div className="flex flex-wrap" role="group" aria-label="Choose a scene">
            {tourScenes.map((item, i) => <button key={item.phase} type="button"
              className="flex h-11 w-9 items-center justify-center" aria-label={`Show ${item.phase} scene`}
              aria-pressed={i === active} onClick={() => select(i)}>
              <span className={`h-2.5 w-7 rounded-full ${i === active ? "bg-red-500" : "bg-cyan-200/35"}`} />
            </button>)}
          </div>
          {!scene.video?.length && <button type="button" onClick={() => setPaused(!paused)} className="tour-play min-h-11 text-sm text-cyan-200 underline">
            {paused ? "Resume slideshow" : "Pause slideshow"}
          </button>}
        </div>
      </div>
    </div>
  </VisualAssetFrame>;
}
