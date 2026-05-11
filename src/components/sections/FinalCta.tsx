import { Zap } from "lucide-react";

export function FinalCta() {
  return (
    <section className="px-6 py-20" aria-labelledby="next-step-heading">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-cyan-300/5 p-8 text-center shadow-[0_0_35px_rgba(34,211,238,0.08)] md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
          <Zap className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2
          id="next-step-heading"
          className="text-3xl font-semibold text-white md:text-5xl"
        >
          Ready for the agent gauntlet.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300">
          This v2 spine has passed ANCHOR-13, GLASSFORGE, SHIPRIGHT, VANTA-9,
          ECHO-VOW, ADA-SENTINEL, Gemini audit, CODEX-BRIDGE packaging, and is
          ready for final Puka Prime sign-off.
        </p>
      </div>
    </section>
  );
}
