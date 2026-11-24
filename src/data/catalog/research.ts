import type { EcosystemGroup } from "@/types/ecosystem";

export const research: EcosystemGroup = {
  id: "applied-research",
  label: "Applied research",
  eyebrow: "Lab experiments",
  description: "Try a small calculation and see which processor did the work.",
  accent: "research",
  cards: [{
    id: "quantum-bridge",
    name: "Quantum Bridge",
    status: "Local simulation available",
    category: "AI-directed quantum processing",
    badgeType: "research",
    icon: "Cpu",
    visibility: "public",
    route: "/research/quantum-bridge",
    cta: "Try the quantum bridge",
    description: "Puka and other applications can request a named calculation. Try the two-qubit sampling exercise locally. A separate IBM Quantum adapter can submit the same circuit when the Lab connects a backend.",
    highlights: ["Local simulation", "Named workloads", "IBM Quantum hardware adapter"],
  }],
};
