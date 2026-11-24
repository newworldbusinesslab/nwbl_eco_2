import Image from "next/image";
import type { MediaAsset } from "@/types/ecosystem";
import { MotionAsset } from "./MotionAsset";

type Props = {
  asset: MediaAsset;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function LabMedia({ asset, alt, className, priority = false, width = 1400, height = 788 }: Props) {
  const still = <Image src={asset.assetPath} alt={alt} width={width} height={height}
    unoptimized loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined}
    className={className} />;
  if (!asset.video?.length) return still;
  return <MotionAsset poster={asset.assetPath} sources={asset.video} captions={asset.captions}
    label={alt} className={className}>{still}</MotionAsset>;
}
