import { statusStyles } from "@/data/statusStyles";
import type { BadgeProps } from "@/types/ecosystem";

export function Badge({ type = "comingSoon", children }: BadgeProps) {
  const style = statusStyles[type] || statusStyles.comingSoon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}
