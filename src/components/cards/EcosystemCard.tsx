"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Hammer,
  Mail,
  ShieldCheck,
  Sparkles,
  Rocket,
  FlaskConical,
  Dog,
  RadioTower,
  Music,
  Store,
  Eye,
  Bot,
  Users,
  ArrowRight,
  Cpu,
  Zap,
  Layers,
  BadgeCheck,
} from "lucide-react";
import { Badge } from "@/components/cards/Badge";
import { visualSlots } from "@/data/visualSlots";
import type {
  EcosystemCard as EcosystemCardType,
  IconName,
} from "@/types/ecosystem";

const iconMap: Record<IconName, React.ElementType> = {
  Brain,
  Hammer,
  Mail,
  ShieldCheck,
  Sparkles,
  Rocket,
  FlaskConical,
  Dog,
  RadioTower,
  Music,
  Store,
  Eye,
  Bot,
  Users,
  ArrowRight,
  Cpu,
  Zap,
  Layers,
  BadgeCheck,
};

const visualTierStyles: Record<string, string> = {
  primary: "ring-1 ring-cyan-300/20",
  standard: "",
  experimental: "border-cyan-300/20",
  proof: "ring-1 ring-cyan-300/25 shadow-[0_0_28px_rgba(34,211,238,0.08)]",
  future: "opacity-95",
};

function getVisualSlot(visualSlotId?: string) {
  if (!visualSlotId) return undefined;
  return visualSlots.find((slot) => slot.id === visualSlotId);
}

export function EcosystemCard({ card }: { card: EcosystemCardType }) {
  const Icon = iconMap[card.icon] || Sparkles;
  const prefersReducedMotion = useReducedMotion();
  const isActive = card.visibility === "public" && Boolean(card.route);
  const visibleHighlights = card.highlights?.slice(0, 4) || [];
  const hiddenHighlightCount = Math.max(
    (card.highlights?.length || 0) - visibleHighlights.length,
    0
  );
  const tierStyle = card.visualTier ? visualTierStyles[card.visualTier] : "";
  const visualSlot = getVisualSlot(card.visualSlotId);

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.055] ${tierStyle}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-0 transition group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-cyan-300">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <Badge type={card.badgeType}>{card.status}</Badge>
          {card.secondaryBadge ? (
            <Badge type={card.badgeType}>{card.secondaryBadge}</Badge>
          ) : null}
        </div>
      </div>

      {visualSlot ? (
        <figure className="mb-5 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black/35 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
          <img
            src={visualSlot.assetPath}
            alt={visualSlot.label}
            loading="lazy"
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <figcaption className="border-t border-white/10 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              {visualSlot.label}
            </p>
          </figcaption>
        </figure>
      ) : null}

      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
        {card.category}
      </p>

      <h3 className="text-2xl font-semibold text-white">{card.name}</h3>

      {card.tagline ? (
        <p className="mt-2 font-mono text-sm text-cyan-200">{card.tagline}</p>
      ) : null}

      <p className="mt-4 flex-1 text-sm leading-6 text-zinc-300">
        {card.description}
      </p>

      {card.revenuePriority ? (
        <div className="mt-5 inline-flex w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-emerald-200">
          Revenue-Ready Service
        </div>
      ) : null}

      {card.strategy ? (
        <blockquote className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm leading-6 text-cyan-100">
          “{card.strategy}”
        </blockquote>
      ) : null}

      {card.reasonTrace ? (
        <div className="mt-5 rounded-2xl border border-violet-300/20 bg-violet-300/5 p-4">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-violet-300">
            Reason Trace
          </p>
          <p className="font-mono text-xs leading-6 text-violet-100">
            {card.reasonTrace}
          </p>
        </div>
      ) : null}

      <ul className="mt-5 space-y-2" aria-label={`${card.name} highlights`}>
        {visibleHighlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-sm text-zinc-300">
            <BadgeCheck
              className="mt-0.5 h-4 w-4 flex-none text-cyan-300"
              aria-hidden="true"
            />
            <span>{highlight}</span>
          </li>
        ))}

        {hiddenHighlightCount > 0 ? (
          <li className="font-mono text-xs text-zinc-500">
            +{hiddenHighlightCount} more systems
          </li>
        ) : null}
      </ul>

      {isActive ? (
        <a
          href={card.route}
          aria-label={`${card.cta}: ${card.name}`}
          className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium text-white transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <span>{card.cta}</span>
          <ArrowRight
            className="h-4 w-4 text-cyan-300 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      ) : (
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-medium text-zinc-400">{card.cta}</span>
          <span
            aria-label={`${card.name} is not yet available`}
            className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-600"
          >
            {card.visibility === "internal" ? "Internal" : "Soon"}
          </span>
        </div>
      )}
    </motion.article>
  );
}
