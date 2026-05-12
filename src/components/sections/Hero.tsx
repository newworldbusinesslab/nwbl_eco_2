import { ArrowRight, Cpu } from "lucide-react";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/landing-opening.webp')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-zinc-950/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_70%_20%,rgba(167,139,250,0.14),transparent_28%),linear-gradient(180deg,rgba(9,9,11,0.4),rgba(9,9,11,1))]" />
      <div
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:44px_44px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
          <Cpu className="h-4 w-4" aria-hidden="true" />
          NWBL Spine Build: Puka Prime v1
        </div>

        <h1
          id="hero-heading"
          className="mx-auto max-w-5xl text-4xl font-black tracking-tight text-white md:text-7xl"
        >
          New World Business Lab
          <span className="block bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            Ecosystem Command Center
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
          New World Business Lab helps founders, creators, vendors, artists,
          nonprofits, and small businesses turn raw ideas into structured
          businesses using AI-guided strategy, websites, marketing, compliance
          support, forecasting, creative production, and launch systems.
        </p>

        <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-6 text-cyan-200/90">
          From raw idea to business model, website, campaign, compliance review,
          proof app, and investor-ready pitch.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Explore the Ecosystem
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <a
            href="#lab-walkthrough"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Enter the Lab
          </a>
        </div>

        <div id="lab-walkthrough" className="mx-auto mt-14 max-w-4xl">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
