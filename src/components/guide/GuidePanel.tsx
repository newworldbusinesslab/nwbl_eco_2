"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type Reply = { mode: "live" | "directory"; answer: string; links: { id: string; title: string; href: string }[] };
type Turn = { question: string; reply: Reply };
type Stop = { title: string; href: string };

export function GuidePanel({ stops }: { stops: Stop[] }) {
  const inputId = useId();
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const latest = useRef<HTMLDivElement>(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => { if (turns.length) latest.current?.scrollIntoView({ block: "nearest" }); }, [turns]);

  async function ask(event: FormEvent) {
    event.preventDefault();
    const text = question.trim();
    if (!text || controller.current) return;
    const request = new AbortController();
    controller.current = request;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/guide", {
        method: "POST", signal: request.signal, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, previous: turns.at(-1)?.reply.links[0]?.id }),
      });
      if (!response.ok) throw new Error();
      const reply: Reply = await response.json();
      if (!reply.answer || !Array.isArray(reply.links)) throw new Error();
      setTurns(history => [...history.slice(-7), { question: text, reply }]);
      setQuestion("");
    } catch {
      if (!request.signal.aborted) setError("The guide couldn’t load an answer. Your question is still here. You can also use the tour links.");
    } finally { controller.current = null; if (!request.signal.aborted) setBusy(false); }
  }

  return <div className="space-y-4">
    <nav className="flex flex-wrap gap-2" aria-label="Lab tour stops">{stops.map(stop =>
      <a className="rounded-xl border border-cyan-300/30 px-3 py-2 text-sm text-cyan-200 underline" key={stop.href} href={stop.href}>{stop.title}</a>)}</nav>
    <div role="log" aria-label="Guide conversation" aria-live="polite" aria-relevant="additions" className="space-y-4">
      {turns.map((turn, i) => <div key={i} className="rounded-xl border border-white/15 p-3">
        <p className="font-semibold text-white">{turn.question}</p>
        <p className="my-2 text-sm text-cyan-200">{turn.reply.mode === "live" ? "Puka · Live AI" : "Puka · Lab directory"}</p>
        <p className="text-zinc-200">{turn.reply.answer}</p>
        <div className="mt-2 flex flex-wrap gap-3">{turn.reply.links.map(link => <a className="text-sm text-cyan-200 underline" href={link.href} key={link.id}>{link.title}</a>)}</div>
      </div>)}
    </div>
    <div ref={latest} />
    <form onSubmit={ask} className="space-y-2">
      <label htmlFor={inputId} className="block font-semibold text-white">Ask Puka about the Lab</label>
      <input id={inputId} value={question} maxLength={500} required readOnly={busy} onChange={e => setQuestion(e.target.value)}
        placeholder="How do I start with an idea?" className="w-full rounded-lg border border-white/30 bg-zinc-900 px-3 py-3 text-white" />
      <p className="text-sm text-zinc-400">Ask about public Lab information. When live AI is connected, your question goes to the AI provider.</p>
      <button type="submit" disabled={busy || !question.trim()} className="rounded-xl bg-cyan-300 px-5 py-2 font-semibold text-zinc-950 disabled:opacity-50">{busy ? "Looking it up…" : "Ask Puka"}</button>
      {error && <p role="alert" className="text-sm text-amber-200">{error}</p>}
    </form>
  </div>;
}
