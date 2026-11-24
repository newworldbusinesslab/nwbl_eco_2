import { intakeUrl } from "@/data/ecosystemCards";
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
          What do you want to build?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300">
          Bring a skill, a customer problem, or a rough idea. Founder intake is the first conversation about who it could help and how to test it.
        </p>
        <a className="mt-5 inline-block rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-zinc-950" href={intakeUrl}>Start founder intake</a>
      </div>
    </section>
  );
}
