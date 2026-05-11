import type { SectionHeaderProps } from "@/types/ecosystem";

export function SectionHeader({
  eyebrow,
  title,
  description,
  headingId,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="text-3xl font-semibold tracking-tight text-white md:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-zinc-300 md:text-lg">
        {description}
      </p>
    </div>
  );
}
