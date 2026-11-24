import type { EcosystemGroup } from "@/types/ecosystem";

export const models: EcosystemGroup = {
  id: "models-and-verticals",
  label: "Businesses, Models, and Field Systems",
  eyebrow: "Revenue, culture, street, and survival layers",
  description:
    "Business models and concept systems that show how NWBL can generate revenue, serve communities, and turn ideas into deployable ventures.",
  accent: "revenue",
  cards: [
    {
      id: "compliance-giants",
      name: "Compliance Giants",
      status: "Production Model",
      badgeType: "production",
      category: "Digital Compliance & Risk Management",
      icon: "ShieldCheck",
      cta: "Service Vertical Locked",
      route: "/services/compliance-giants",
      visibility: "public",
      visualTier: "primary",
      visualSlotId: "compliance-giants-visual",
      revenuePriority: true,
      description:
        "A premium accessibility and digital compliance remediation service that helps organizations improve accessibility readiness through technical review, WCAG-informed remediation, and documentation support.",
      highlights: [
        "Full Accessibility Audit + Remediation Package",
        "ADA Title III / WCAG 2.2 AA / Section 508",
        "Success-based one-time payment",
        "Baseline price: $7,500",
        "Private, professional, non-coercive outreach",
      ],
      disclaimers: [
        "No guarantee of legal compliance",
        "No guarantee of DOJ, OCR, or agency approval",
        "Not a substitute for legal counsel",
        "Validation applies only to the identified issues and agreed remediation scope",
      ],
    },
    {
      id: "sauce",
      name: "S.A.U.C.E.",
      status: "Pilot Model in Design",
      badgeType: "phase1",
      category: "Street AI Urban Commerce Engine",
      icon: "Store",
      cta: "Pilot Model Coming Soon",
      route: "/pilots/sauce",
      visibility: "future",
      visualTier: "experimental",
      visualSlotId: "sauce-visual",
      description:
        "S.A.U.C.E. is an AI-assisted mobile micro-commerce network designed for dense urban environments, turning carts, kiosks, bikes, and compact vending stations into smarter street-native storefronts.",
      highlights: [
        "Tablet AI sales assistant",
        "Hyperlocal demand tracking",
        "Supply-chain intelligence",
        "Vendor training",
        "Mission District pilot concept",
      ],
      riskNotes: [
        "Pilots should follow applicable local vending, business licensing, product safety, food handling, and public-space rules",
      ],
    },
    {
      id: "ghosthawk",
      name: "GHOSTHAWK™",
      status: "Phase 1 Concept / Experimental",
      badgeType: "experimental",
      category: "Adaptive Urban Survival Ecosystem",
      icon: "RadioTower",
      cta: "Ghosthawk Coming Soon",
      route: "/concepts/ghosthawk",
      visibility: "future",
      visualTier: "experimental",
      visualSlotId: "ghosthawk-visual",
      tagline: "Wear the city. Read the city. Survive the city.",
      description:
        "GHOSTHAWK™ is an AI-powered urban mobility and wearable technology concept built around modular smart streetwear, environmental awareness, personal AI guidance, privacy-first support, and real-world avatar progression.",
      highlights: [
        "GHOSTTHREAD™ ARMORWEAR",
        "HAWK-LINK™ universal entry node",
        "HOOD HAWKEYE™ awareness network",
        "GHOSTCORE AI™ with Zero-Log Local Storage principles",
        "High-Vis Safety Orange + Asphalt Grey + Neon Cyan",
      ],
      riskNotes: [
        "Privacy-first urban safety concept",
        "Avoid public claims around surveillance, police evasion, or guaranteed safety",
        "Sensitive movement and harm-reduction data should not be sold to advertisers or third-party data brokers",
      ],
    },
  ],
};
