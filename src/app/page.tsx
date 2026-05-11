import { cardGroups } from "@/data/ecosystemCards";
import { Hero } from "@/components/sections/Hero";
import { SpineSummary } from "@/components/sections/SpineSummary";
import { WhatNwblDoes } from "@/components/sections/WhatNwblDoes";
import { EcosystemGroup } from "@/components/sections/EcosystemGroup";
import { AgentPipeline } from "@/components/sections/AgentPipeline";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { ImagePlaceholderGrid } from "@/components/visuals/ImagePlaceholderGrid";
import { RobotGuidePlaceholder } from "@/components/visuals/RobotGuidePlaceholder";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 text-zinc-100">
      <a
        href="#ecosystem"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-cyan-300 focus:px-4 focus:py-3 focus:font-semibold focus:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Skip to ecosystem content
      </a>

      <Hero />
      <WhatNwblDoes />
      <SpineSummary />

      <div id="ecosystem" className="mx-auto max-w-7xl px-6">
        {cardGroups.map((group) => (
          <EcosystemGroup key={group.id} group={group} />
        ))}
        <AgentPipeline />
      </div>

      <ImagePlaceholderGrid />
      <FinalCta />
      <Footer />
      <RobotGuidePlaceholder />
    </main>
  );
}
