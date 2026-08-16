import type { ImgHTMLAttributes } from "react";
import type { ThemeImageAsset } from "@/lib/image-assets";
import { useTheme } from "@/lib/theme";
import { OptimizedImage } from "./optimized-image";

type ThemedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> & {
  asset: ThemeImageAsset;
  sizes: string;
  alt: string | { luxury: string; summer: string };
};

export function ThemedImage({ asset, ...props }: ThemedImageProps) {
  const { theme } = useTheme();
  const selectedAsset = asset[theme];
  const alt = typeof props.alt === "string" ? props.alt : props.alt[theme];
  return (
    <OptimizedImage
      asset={selectedAsset}
      {...props}
      width={selectedAsset.width}
      height={selectedAsset.height}
      alt={alt}
    />
  );
}
