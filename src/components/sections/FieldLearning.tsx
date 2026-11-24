import { lessons } from "@/data/lessons";
import { catalog } from "@/data/ecosystemCards";

const names = new Map(catalog.map(card => [card.id, card.name]));

export function FieldLearning({ entryId }: { entryId?: string }) {
  const selected = lessons.filter(item => !entryId || item.from === entryId || item.appliesTo.includes(entryId));
  if (!selected.length) return null;
  return <section id="field-learning" className="mx-auto max-w-7xl px-6 py-12" aria-labelledby="learning-title">
    <p className="text-sm uppercase tracking-widest text-cyan-200">Learning across ventures</p>
    <h2 id="learning-title" className="mt-2 text-3xl font-semibold text-white">What one business can teach another</h2>
    <div className="mt-5 grid gap-4 md:grid-cols-2">{selected.map(lesson => <article key={lesson.id} className="rounded-2xl border border-white/15 p-5">
      <p className="text-sm text-cyan-200">{lesson.status === "proposed" ? "Proposed field test" : "Verified practice"} · From {names.get(lesson.from)}</p>
      <h3 className="my-2 text-xl font-semibold text-white">{lesson.title}</h3>
      <p className="text-zinc-300">{lesson.method}</p>
      <p className="my-3 text-sm text-zinc-300">{lesson.status === "proposed" ? lesson.check : <>{lesson.result} <a href={lesson.evidence} className="underline">View evidence</a></>}</p>
      <p className="text-sm text-zinc-400">For {lesson.appliesTo.map(id => names.get(id)).join(" and ")}.</p>
    </article>)}</div>
  </section>;
}
