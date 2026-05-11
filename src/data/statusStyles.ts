import type { StatusStyleMap } from "@/types/ecosystem";

export const statusStyles: StatusStyleMap = {
  production:
    "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.12)]",
  core:
    "border-blue-400/40 bg-blue-400/10 text-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.12)]",
  phase1:
    "border-orange-400/50 bg-orange-400/10 text-orange-300 shadow-[0_0_14px_rgba(251,146,60,0.14)]",
  experimental:
    "border-cyan-400/50 bg-cyan-400/10 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.12)]",
  comingSoon: "border-slate-400/40 bg-slate-400/10 text-slate-300",
  vibeAlchemy:
    "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
  visionPulse:
    "border-violet-400/40 bg-violet-400/10 text-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.18)]",
  research:
    "border-lime-400/40 bg-lime-400/10 text-lime-300 shadow-[0_0_18px_rgba(163,230,53,0.14)]",
};
