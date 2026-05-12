import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <>
      <section
        className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-10 text-white"
        aria-labelledby="hero-heading"
      >
        <img
          src="/images/hero/landing-opening.webp"
          alt="New World Business Lab exterior entrance"
          className="absolute inset-0 h-full w-full object-contain object-top opacity-95"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute inset-0 bg-zinc-950/15" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-end">
          <div className="max-w-3xl rounded-3xl border border-white/15 bg-zinc-950/55 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              NWBL Spine Build: Puka Prime v1
            </p>

            <h1
              id="hero-heading"
              className="text-4xl font-black tracking-tight md:text-7xl"
            >
              New World Business Lab
              <span className="block bg-gradient-to-r from-cyan-200 via-blue-300 to-red-300 bg-clip-text text-transparent">
                Ecosystem Command Center
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 md:text-lg">
              AI-guided strategy, websites, marketing, forecasting, creative production,
              compliance support, and launch systems for builders ready to enter the Lab.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#lab-walkthrough"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200"
              >
                Enter the Lab
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#ecosystem"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Explore the Ecosystem
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="lab-walkthrough"
        className="bg-zinc-950 px-6 py-20 text-white scroll-mt-4"
        aria-label="Mrs. Kapu AI Ukalani Lab walkthrough"
      >
        <div className="mx-auto max-w-4xl">
          <HeroVisual />
        </div>
      </section>
    </>
  );
}
