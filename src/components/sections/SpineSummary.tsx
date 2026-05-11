import { spineSummaryItems } from "@/data/spineSummary";

export function SpineSummary() {
  return (
    <section className="px-6 py-16" aria-labelledby="spine-summary-heading">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-lime-300">
              The organism map
            </p>
            <h2
              id="spine-summary-heading"
              className="text-3xl font-semibold text-white md:text-5xl"
            >
              One Lab. Many engines. One growth path.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-300">
            The first build keeps the ecosystem visible while leaving room for
            deeper service pages, dashboards, payments, agent systems, and
            Codex-driven expansion later.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spineSummaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-black/25 p-4"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
