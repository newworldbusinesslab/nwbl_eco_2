import type { ReactNode } from "react";

export function VisualAssetFrame({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]"
        aria-hidden="true"
      />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">
          {label}
        </p>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
