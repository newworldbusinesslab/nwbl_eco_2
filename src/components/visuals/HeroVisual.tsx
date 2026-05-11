import { VisualAssetFrame } from "@/components/visuals/VisualAssetFrame";

export function HeroVisual() {
  return (
    <VisualAssetFrame
      label="Hero visual slot"
      description="Reserved for the cinematic NWBL laboratory scene, logo motion, robot guide, and future homepage animation system."
    >
      <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-cyan-300/25 bg-black/30 text-center">
        <div>
          <p className="text-lg font-semibold text-white">
            Hero Lab Scene Placeholder
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
            Drop final lab scene art or animation still into /public/images/hero/ when ready.
          </p>
        </div>
      </div>
    </VisualAssetFrame>
  );
}
