import { EcosystemCard } from "@/components/cards/EcosystemCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { EcosystemGroup as EcosystemGroupType } from "@/types/ecosystem";

const groupAccentStyles: Record<string, string> = {
  core: "from-cyan-300/10",
  revenue: "from-emerald-300/10",
  proof: "from-cyan-300/15",
  research: "from-lime-300/10",
};

export function EcosystemGroup({ group }: { group: EcosystemGroupType }) {
  const headingId = `${group.id}-heading`;
  const accentStyle = group.accent
    ? groupAccentStyles[group.accent]
    : "from-white/5";

  return (
    <section className="relative py-16" aria-labelledby={headingId}>
      <div
        className={`pointer-events-none absolute inset-x-0 top-8 h-px bg-gradient-to-r ${accentStyle} via-white/10 to-transparent`}
        aria-hidden="true"
      />
      <SectionHeader
        headingId={headingId}
        eyebrow={group.eyebrow}
        title={group.label}
        description={group.description}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {group.cards.map((card) => (
          <EcosystemCard key={card.name} card={card} />
        ))}
      </div>
    </section>
  );
}
