import { FieldLearning } from "@/components/sections/FieldLearning";
import { QuantumDemo } from "@/components/research/QuantumDemo";
import { GuidePanel } from "@/components/guide/GuidePanel";
import { tourStops } from "@/lib/guide-directory";
import { intakeUrl } from "@/data/ecosystemCards";
import type { EcosystemCard } from "@/types/ecosystem";

export function CatalogPage({ card }: { card: EcosystemCard }) {
  return <main id="main-content" className="mx-auto min-h-screen max-w-4xl px-5 py-12 text-zinc-100">
    <a href={"/#" + card.id} className="text-sm text-cyan-200 underline">Back to the Lab</a>
    <p className="mt-10 text-sm uppercase tracking-widest text-cyan-200">{card.status}</p>
    <h1 className="my-3 text-4xl font-bold md:text-5xl">{card.name}</h1>
    <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">{card.description}</p>
    {card.id === "guide" ? <div className="my-8"><GuidePanel stops={tourStops} /></div> :
      <ul className="my-6 list-disc space-y-2 pl-6 text-zinc-300">{card.highlights?.map(item => <li key={item}>{item}</li>)}</ul>}
    {card.id === "quantum-bridge" && <QuantumDemo />}
    {card.website && <a className="inline-block rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-zinc-950" href={card.website}>Visit {card.name}</a>}
    {card.id === "knowledge-forge" && <a className="text-cyan-200 underline" href={intakeUrl}>Start founder intake</a>}
    {card.disclaimers?.map(note => <p key={note} className="mt-2 text-sm text-zinc-400">{note}</p>)}
    <FieldLearning entryId={card.id} />
  </main>;
}
