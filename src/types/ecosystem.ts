import type React from "react";

export type BadgeType =
  | "production"
  | "core"
  | "phase1"
  | "experimental"
  | "comingSoon"
  | "vibeAlchemy"
  | "visionPulse"
  | "research";

export type Visibility = "public" | "internal" | "future";

export type VisualTier =
  | "primary"
  | "standard"
  | "experimental"
  | "proof"
  | "future";

export type GroupAccent = "core" | "revenue" | "proof" | "research";

export type IconName =
  | "Brain"
  | "Hammer"
  | "Mail"
  | "ShieldCheck"
  | "Sparkles"
  | "Rocket"
  | "FlaskConical"
  | "Dog"
  | "RadioTower"
  | "Music"
  | "Store"
  | "Eye"
  | "Bot"
  | "Users"
  | "ArrowRight"
  | "Cpu"
  | "Zap"
  | "Layers"
  | "BadgeCheck";

export type InternalPipeline = {
  connectedEngine: string;
  visibility: "internal";
  purpose: string;
};

export type EcosystemCard = {
  id: string;
  website?: string;
  name: string;
  status: string;
  badgeType: BadgeType;
  category: string;
  icon: IconName;
  cta: string;
  description: string;
  route?: string;
  visibility: Visibility;
  visualTier?: VisualTier;
  revenuePriority?: boolean;
  tagline?: string;
  secondaryBadge?: string;
  highlights?: string[];
  strategy?: string;
  reasonTrace?: string;
  internalPipeline?: InternalPipeline;
  riskNotes?: string[];
  disclaimers?: string[];
  visualSlotId?: string;
};

export type EcosystemGroup = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  accent?: GroupAccent;
  cards: EcosystemCard[];
};

export type BuildAgent = {
  name: string;
  role: string;
};

export type SpineSummaryItem = {
  label: string;
  value: string;
};

export type StatusStyleMap = Record<BadgeType, string>;

export type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  headingId?: string;
};

export type BadgeProps = {
  type?: BadgeType;
  children: React.ReactNode;
};

export type VideoSource = { src: string; type: "video/webm" | "video/mp4" };
export type MediaAsset = { assetPath: string; video?: VideoSource[]; captions?: string };

export type VisualSlot = MediaAsset & {
  id: string;
  label: string;
  description: string;
  intendedUse: string;
};
