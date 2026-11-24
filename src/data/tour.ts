import type { MediaAsset } from "@/types/ecosystem";

export const entrance: MediaAsset = { assetPath: "/images/hero/landing-opening.webp" };

type Scene = MediaAsset & { phase: string; title: string; text: string; alt: string };
export const tourScenes: Scene[] = [
  {
    phase: "WELCOME",
    title: "I’m Mrs. Kapu AI Ukalani.",
    text: "Let’s build the future together.",
    alt: "The illuminated NWBL sign above the Lab entrance at night",
    assetPath: "/images/hero/kapu-scene-1.webp",
  },
  {
    phase: "STAND",
    title: "We rise to create impact.",
    text: "The Lab comes online.",
    alt: "Puka sits at the reception desk beneath the Lab logo",
    assetPath: "/images/hero/kapu-scene-2.webp",
  },
  {
    phase: "TRANSFORM",
    title: "From potential to purpose.",
    text: "Vision becomes structure.",
    alt: "Puka leaves reception and turns toward the control room",
    assetPath: "/images/hero/kapu-scene-3.webp",
  },
  {
    phase: "PREPARE",
    title: "Excellence is in the details.",
    text: "Every system gets sharpened.",
    alt: "Puka walks between workstations in the blue-lit control room",
    assetPath: "/images/hero/kapu-scene-4.webp",
  },
  {
    phase: "EXPLORE",
    title: "Innovation in every step.",
    text: "Walk through the Lab.",
    alt: "Puka stands beside a colleague and the Lab displays",
    assetPath: "/images/hero/kapu-scene-5.webp",
  },
  {
    phase: "INSPIRE",
    title: "The future is not waiting.",
    text: "Let’s build it.",
    alt: "Puka stands in front of an illuminated globe",
    assetPath: "/images/hero/kapu-scene-6.webp",
  },
];
