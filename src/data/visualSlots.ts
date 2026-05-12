import type { VisualSlot } from "@/types/ecosystem";

const svgVisual = (
  title: string,
  subtitle: string,
  icon: string,
  accent = "#22d3ee",
  secondary = "#ef4444"
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${title}">
    <defs>
      <radialGradient id="g" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="${accent}" stop-opacity=".42"/><stop offset=".45" stop-color="#07111f"/><stop offset="1" stop-color="#02040a"/></radialGradient>
      <linearGradient id="l" x1="0" x2="1"><stop stop-color="${secondary}"/><stop offset="1" stop-color="${accent}"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0v48" fill="none" stroke="#38bdf8" stroke-opacity=".08"/></pattern>
    </defs>
    <rect width="1200" height="675" fill="url(#g)"/>
    <rect width="1200" height="675" fill="url(#grid)"/>
    <path d="M40 80C230 20 350 140 520 95s290-90 640 5" fill="none" stroke="url(#l)" stroke-width="4" stroke-opacity=".65" filter="url(#glow)"/>
    <path d="M60 585C260 515 420 630 600 565s335-95 540-10" fill="none" stroke="url(#l)" stroke-width="3" stroke-opacity=".45"/>
    <g filter="url(#glow)">
      <circle cx="600" cy="250" r="112" fill="#02040a" stroke="${accent}" stroke-width="3" stroke-opacity=".85"/>
      <circle cx="600" cy="250" r="76" fill="none" stroke="${secondary}" stroke-width="2" stroke-opacity=".65"/>
      <text x="600" y="282" text-anchor="middle" font-size="86" font-family="Arial, sans-serif">${icon}</text>
    </g>
    <g opacity=".88">
      <rect x="146" y="418" width="908" height="138" rx="28" fill="#05070d" fill-opacity=".72" stroke="${accent}" stroke-opacity=".3"/>
      <text x="600" y="478" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" font-weight="700" fill="#f8fafc">${title}</text>
      <text x="600" y="526" text-anchor="middle" font-size="24" font-family="Arial, sans-serif" fill="#bae6fd">${subtitle}</text>
    </g>
    <g opacity=".72" stroke="url(#l)" stroke-width="3" fill="none">
      <circle cx="190" cy="185" r="18"/><circle cx="1015" cy="218" r="18"/><circle cx="940" cy="480" r="14"/><circle cx="255" cy="498" r="14"/>
      <path d="M208 185h230M762 218h235M269 498h190M742 480h184"/>
    </g>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const visualSlots: VisualSlot[] = [
  {
    id: "logo-primary",
    label: "Primary NWBL Logo",
    description: "Main New World Business Lab logo asset slot.",
    assetPath: svgVisual("New World Business Lab", "Primary logo fallback", "🧪"),
    intendedUse: "Header, hero badge, footer, metadata, and launch branding."
  },
  {
    id: "hero-lab-scene",
    label: "Hero Laboratory Scene",
    description: "Large cinematic homepage visual showing humans and robots building together inside the Lab.",
    assetPath: svgVisual("NWBL Command Lab", "Humans, robots, and business systems building together", "🌐"),
    intendedUse: "Hero section background or right-side visual once final art is ready."
  },
  {
    id: "robot-guide-character",
    label: "Mrs. Kapu AI Ukalani",
    description: "Front-facing guide character that will eventually greet and route users through the Lab.",
    assetPath: svgVisual("Mrs. Kapu AI Ukalani", "AI guide, intake host, and site tour operator", "🤖"),
    intendedUse: "Homepage assistant, onboarding guide, future animated walkthrough character."
  },
  {
    id: "knowledge-forge-visual",
    label: "Knowledge Forge Visual",
    description: "Founder discovery, idea extraction, and business formation visual slot.",
    assetPath: svgVisual("Knowledge Forge", "Sketches become strategy, systems, and launch maps", "🧠"),
    intendedUse: "Knowledge Forge card, detail page, and onboarding sections."
  },
  {
    id: "founder-intake-visual",
    label: "Founder Intake Visual",
    description: "Founder interview, readiness routing, and first-contact discovery visual slot.",
    assetPath: svgVisual("Founder Intake", "First conversation into the right Lab engine", "👥"),
    intendedUse: "Founder Intake card and onboarding route preview."
  },
  {
    id: "vision-pulse-visual",
    label: "Vision Pulse AI Visual",
    description: "Quantum forecasting, probability branches, reason trace, and adaptive timing visual slot.",
    assetPath: svgVisual("Vision Pulse AI", "Quantum-enhanced timing, risk, and reason trace", "👁️", "#a78bfa"),
    intendedUse: "Vision Pulse card, dashboard preview, and future intelligence layer page."
  },
  {
    id: "lab-mail-visual",
    label: "Lab Mail Visual",
    description: "Communication engine, campaign pipeline, and automated follow-up visual slot.",
    assetPath: svgVisual("Lab Mail", "Campaigns, customers, follow-up, and conversion flow", "✉️"),
    intendedUse: "Lab Mail card, campaign previews, and CRM-style mockups."
  },
  {
    id: "feature-evolution-visual",
    label: "Feature Evolution Visual",
    description: "Living upgrade system, tool absorption, and connected feature network visual slot.",
    assetPath: svgVisual("Feature Evolution", "Useful tools rebuilt as native Lab upgrades", "🧬"),
    intendedUse: "Feature Evolution card and future marketplace/upgrade section."
  },
  {
    id: "research-development-visual",
    label: "Research & Development Visual",
    description: "Expedition chamber, science, quantum, ancient systems, and future industry visual slot.",
    assetPath: svgVisual("Research & Development", "Business, science, quantum, economics, and theory testing", "⚗️"),
    intendedUse: "R&D card, expedition pages, and research dashboards."
  },
  {
    id: "web-forge-visual",
    label: "Web Forge Visual",
    description: "Website, app, prototype, interface, and deployment infrastructure visual slot.",
    assetPath: svgVisual("Web Forge", "Modern websites, app prototypes, and launch infrastructure", "💻"),
    intendedUse: "Web Forge card and build-system previews."
  },
  {
    id: "investor-path-visual",
    label: "Investor Path Visual",
    description: "Funding route, investor packaging, pitch materials, and traction proof visual slot.",
    assetPath: svgVisual("Investor Path", "Pitch packages, funding strategy, and proof assets", "🚀", "#60a5fa"),
    intendedUse: "Investor Path card and investor-readiness pages."
  },
  {
    id: "compliance-giants-visual",
    label: "Compliance Giants Visual",
    description: "Accessibility audit, remediation payload, and digital compliance visual slot.",
    assetPath: svgVisual("Compliance Giants", "Accessibility audit, remediation, and risk documentation", "🛡️", "#34d399"),
    intendedUse: "Compliance Giants card, service page, audit report preview, and Stripe-ready sales page."
  },
  {
    id: "soul-forge-studio-visual",
    label: "Soul Forge Studio Visual",
    description: "Story-to-music studio, artist creation, waveform, lyrics, and album world visual slot.",
    assetPath: svgVisual("Soul Forge Studio", "Stories transformed into songs, albums, and creative worlds", "🎛️", "#f472b6"),
    intendedUse: "Soul Forge card, coming-soon page, music project examples, and future creator dashboard."
  },
  {
    id: "sauce-visual",
    label: "S.A.U.C.E. Visual",
    description: "Street AI Urban Commerce Engine, mobile cart, tablet assistant, and micro-commerce visual slot.",
    assetPath: svgVisual("S.A.U.C.E.", "Street AI Urban Commerce Engine", "🛒", "#facc15"),
    intendedUse: "S.A.U.C.E. pilot card, field-system page, and route/inventory mockups."
  },
  {
    id: "ghosthawk-visual",
    label: "GHOSTHAWK Visual",
    description: "Urban mobility, privacy-first smart streetwear, Hawk-Link, and awareness network visual slot.",
    assetPath: svgVisual("GHOSTHAWK", "Wear the city. Read the city. Survive the city.", "🦅", "#f59e0b"),
    intendedUse: "GHOSTHAWK card, experimental concept page, wearable mockups, and avatar progression visuals."
  },
  {
    id: "ai-k9-chime-visual",
    label: "AI K9 Chime Visual",
    description: "SmartCollar, ultrasonic training-support interface, waveform, and canine telemetry visual slot.",
    assetPath: svgVisual("AI K9 Chime", "Silent command intelligence and SmartCollar roadmap", "🐕", "#38bdf8"),
    intendedUse: "AI K9 Chime card, app MVP page, demo screenshots, and future product deck."
  },
  {
    id: "ecosystem-map-visual",
    label: "Ecosystem Map Visual",
    description: "Full NWBL organism map showing engines, services, data routes, and growth paths.",
    assetPath: svgVisual("NWBL Ecosystem Map", "Engines, services, data routes, and growth paths", "🗺️"),
    intendedUse: "Spine Summary, investor materials, and future interactive ecosystem diagram."
  },
  {
    id: "homepage-animation-still",
    label: "Homepage Animation Still",
    description: "Static fallback for the future homepage animation before full motion assets are implemented.",
    assetPath: svgVisual("Homepage Intro", "Reduced-motion fallback for the animated Lab sequence", "🌍"),
    intendedUse: "Animation fallback, reduced-motion mode, and initial homepage visual system."
  }
];
