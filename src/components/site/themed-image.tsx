import type { ImgHTMLAttributes } from "react";
import type { ThemeImageAsset } from "@/lib/image-assets";
import { useTheme } from "@/lib/theme";

type ThemedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "alt" | "width" | "height"
> & {
  asset: ThemeImageAsset;
  alt: string | { luxury: string; summer: string };
};

export function ThemedImage({ asset, ...props }: ThemedImageProps) {
  const { theme } = useTheme();
  const selectedAsset = asset[theme];
  const alt = typeof props.alt === "string" ? props.alt : props.alt[theme];
  return (
    <img
      {...props}
      src={selectedAsset.src}
      width={selectedAsset.width}
      height={selectedAsset.height}
      alt={alt}
    />
  );
}
