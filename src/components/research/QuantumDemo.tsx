"use client";

import { useState } from "react";
import workloads from "../../../quantum/workloads.json";

export function QuantumDemo() {
  const spec = workloads["bell-pair"];
  const [counts, setCounts] = useState<{ zero: number; one: number } | null>(null);
  function sample() {
    // The ideal Bell state has exactly two equiprobable outcomes.
    const samples = crypto.getRandomValues(new Uint8Array(spec.defaultShots));
    const one = samples.reduce((total, sample) => total + (sample & 1), 0);
    setCounts({ zero: samples.length - one, one });
  }
  return <section className="my-7 rounded-2xl border border-lime-300/30 bg-lime-300/5 p-5" aria-labelledby="sample-heading">
    <p className="text-sm text-lime-200">Local simulation · {spec.defaultShots} samples</p>
    <h2 id="sample-heading" className="mt-1 text-2xl font-semibold">Run a Bell pair</h2>
    <p className="my-3 text-zinc-300">{spec.description} Your browser samples that ideal distribution.</p>
    <button type="button" className="rounded-xl bg-lime-200 px-4 py-3 font-semibold text-zinc-950" onClick={sample}>Run local sample</button>
    <div role="status" aria-live="polite">{counts && <div className="mt-4 flex gap-6 font-mono"><span>00 · {counts.zero}</span><span>11 · {counts.one}</span></div>}</div>
    <p className="mt-4 text-sm text-zinc-400">IBM hardware runs use the operator bridge. A hardware submission returns an IBM job ID for checking status and retrieving measurements.</p>
  </section>;
}
