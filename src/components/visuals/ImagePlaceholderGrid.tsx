import { visualSlots } from "@/data/visualSlots";
import { VisualAssetFrame } from "@/components/visuals/VisualAssetFrame";

export function ImagePlaceholderGrid() {
  return (
    <section className="px-6 py-16" aria-labelledby="visual-placeholders-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
            Visual asset slots
          </p>
          <h2
            id="visual-placeholders-heading"
            className="text-3xl font-semibold text-white md:text-5xl"
          >
            Imagery architecture reserved.
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300 md:text-lg">
            The spine includes placeholder slots for the logo, hero scene, robot guide, module art, service visuals, diagrams, animation stills, and future page imagery.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visualSlots.map((slot) => (
            <VisualAssetFrame
              key={slot.id}
              label={slot.label}
              description={slot.description}
            >
              <div className="mt-5 rounded-2xl border border-dashed border-cyan-300/25 bg-black/30 p-4">
                <p className="font-mono text-xs text-cyan-200">{slot.assetPath}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {slot.intendedUse}
                </p>
              </div>
            </VisualAssetFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
