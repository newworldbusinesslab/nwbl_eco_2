import type { EcosystemGroup } from "@/types/ecosystem";

export const builds: EcosystemGroup = {
  id: "vibe-alchemy",
  label: "Vibe Alchemy Builds",
  eyebrow: "Proof apps forged through lab coding",
  description:
    "Prototype applications that prove NWBL can turn an idea into architecture, code, deployment, and live product motion. Proof that NWBL can turn ideas into deployable apps.",
  accent: "proof",
  cards: [
    {
      id: "ai-k9-chime",
      name: "AI K9 Chime™",
      status: "MVP in Development",
      badgeType: "vibeAlchemy",
      category: "PetTech / Wearable Intelligence",
      icon: "Dog",
      cta: "App MVP Coming Soon",
      route: "/builds/ai-k9-chime",
      visibility: "public",
      visualTier: "proof",
      visualSlotId: "ai-k9-chime-visual",
      tagline: "Silent Command Intelligence + SmartCollar Ecosystem",
      description:
        "AI K9 Chime™ is a Vibe Alchemy proof app combining a prototype ultrasonic training-support interface, AI-assisted training intelligence, and future SmartCollar telemetry into a next-generation canine wellness and communication concept.",
      highlights: [
        "Ultrasonic command dashboard",
        "Silent Mode + Audible Test Mode",
        "SmartCollar roadmap",
        "Web Audio API prototype",
        "GitHub-ready and Vercel-ready MVP",
      ],
      disclaimers: [
        "Prototype training-support concept",
        "Not a substitute for professional veterinary advice or certified animal training",
        "Ultrasonic response may vary by device, environment, dog, hearing ability, and training history",
      ],
    },
  ],
};
