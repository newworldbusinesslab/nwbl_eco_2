import { buildAgents } from "@/data/buildAgents";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function AgentPipeline() {
  return (
    <section className="py-16" aria-labelledby="agent-pipeline-heading">
      <SectionHeader
        headingId="agent-pipeline-heading"
        eyebrow="Build command chain"
        title="The Coding Agent Team"
        description="Every build moves through a review chain before Codex execution, ensuring structure, polish, security, accessibility, deployment readiness, and final architectural sign-off."
      />

      <div className="mx-auto grid max-w-5xl gap-4">
        {buildAgents.map((agent, index) => (
          <div
            key={agent.name}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/25 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 font-mono text-sm text-cyan-200">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-white">
                {agent.name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-300">
                {agent.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
