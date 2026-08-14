import type { ImgHTMLAttributes } from "react";
import type { ImageAsset } from "@/lib/image-assets";

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  asset: ImageAsset;
  sizes: string;
};

export function OptimizedImage({ asset, sizes, alt, ...props }: OptimizedImageProps) {
  return (
    <picture>
      {asset.avif && <source type="image/avif" srcSet={asset.avif} sizes={sizes} />}
      {asset.webp && <source type="image/webp" srcSet={asset.webp} sizes={sizes} />}
      <img {...props} src={asset.fallback} alt={alt} sizes={sizes} />
    </picture>
  );
}
