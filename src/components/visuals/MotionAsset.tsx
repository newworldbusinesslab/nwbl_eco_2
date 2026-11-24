"use client";

import { useState, type ReactNode } from "react";
import type { VideoSource } from "@/types/ecosystem";

export function MotionAsset({ poster, sources, captions, label, className, children }: {
  poster: string; sources: VideoSource[]; captions?: string; label: string; className?: string; children: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{children}<span className="sr-only" role="status">Video unavailable. Showing the still image.</span></>;
  return <video controls playsInline preload="none" poster={poster} aria-label={label}
    className={className} onError={() => setFailed(true)}>
    {sources.map((source, i) => <source key={source.src} {...source}
      onError={i === sources.length - 1 ? () => setFailed(true) : undefined} />)}
    {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
    {children}
  </video>;
}
