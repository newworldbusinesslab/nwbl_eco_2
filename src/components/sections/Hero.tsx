import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-zinc-950 px-4 py-8 text-white sm:px-6 sm:py-12"
        aria-label="New World Business Lab landing"
      >
        <div className="relative mx-auto flex max-w-6xl flex-col items-center">
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
            <img
              src="/images/hero/landing-opening.webp"
              alt="New World Business Lab exterior entrance"
              className="block h-auto w-full object-contain object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-transparent" />
          </div>

          <div className="relative -mt-6 w-full max-w-4xl rounded-[2rem] border border-white/12 bg-zinc-950/88 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/85">
              New World Business Lab
            </p>

            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-200 sm:text-lg">
              Placeholder description: AI-guided strategy, websites, marketing,
              forecasting, creative production, compliance support, and launch
              systems for builders ready to enter the Lab.
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
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
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
