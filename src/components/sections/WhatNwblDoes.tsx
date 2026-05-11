const nwblSteps = [
  {
    title: "Discover the idea",
    description:
      "Use AI-guided intake to uncover skills, stories, problems, markets, and business potential.",
  },
  {
    title: "Build the system",
    description:
      "Turn the idea into a business model, website, campaign, compliance path, or prototype.",
  },
  {
    title: "Launch and grow",
    description:
      "Use Lab Mail, Vision Pulse, Investor Path, and the wider ecosystem to reach customers and scale intelligently.",
  },
];

export function WhatNwblDoes() {
  return (
    <section className="px-6 py-12" aria-labelledby="what-nwbl-does-heading">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
            What NWBL does
          </p>
          <h2
            id="what-nwbl-does-heading"
            className="text-3xl font-semibold text-white md:text-5xl"
          >
            From raw idea to structured business.
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            New World Business Lab helps people move from raw idea to structured
            business through AI-guided intake, business modeling, website and
            app building, marketing, compliance support, forecasting, and
            investor preparation.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {nwblSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-black/25 p-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
