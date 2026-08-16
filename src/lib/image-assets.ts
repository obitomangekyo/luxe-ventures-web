// Vite resolves these query imports through vite-imagetools at build time.
// TypeScript cannot resolve the generated virtual modules statically.
// @ts-nocheck

import luxuryCorporateAvif from "@/assets/images/luxury/corporate-gathering.jpg?w=480;768;1200&format=avif&as=srcset";
import luxuryCorporateWebp from "@/assets/images/luxury/corporate-gathering.jpg?w=480;768;1200&format=webp&as=srcset";
import luxuryCorporateJpg from "@/assets/images/luxury/corporate-gathering.jpg?w=1200&format=jpg";
import luxuryCustomAvif from "@/assets/images/luxury/custom-theme.jpg?w=480;768;1200&format=avif&as=srcset";
import luxuryCustomWebp from "@/assets/images/luxury/custom-theme.jpg?w=480;768;1200&format=webp&as=srcset";
import luxuryCustomJpg from "@/assets/images/luxury/custom-theme.jpg?w=1200&format=jpg";
import luxuryGardenAvif from "@/assets/images/luxury/garden-celebration.jpg?w=480;768;1200&format=avif&as=srcset";
import luxuryGardenWebp from "@/assets/images/luxury/garden-celebration.jpg?w=480;768;1200&format=webp&as=srcset";
import luxuryGardenJpg from "@/assets/images/luxury/garden-celebration.jpg?w=1200&format=jpg";
import luxuryHeroAvif from "@/assets/images/luxury/hero-celebration.jpg?w=480;768;960&format=avif&as=srcset";
import luxuryHeroWebp from "@/assets/images/luxury/hero-celebration.jpg?w=480;768;960&format=webp&as=srcset";
import luxuryHeroJpg from "@/assets/images/luxury/hero-celebration.jpg?w=960&format=jpg";
import luxuryDinnerAvif from "@/assets/images/luxury/intimate-dinner.jpg?w=480;768;1200&format=avif&as=srcset";
import luxuryDinnerWebp from "@/assets/images/luxury/intimate-dinner.jpg?w=480;768;1200&format=webp&as=srcset";
import luxuryDinnerJpg from "@/assets/images/luxury/intimate-dinner.jpg?w=1200&format=jpg";
import luxuryPlaceAvif from "@/assets/images/luxury/place-setting.jpg?w=480;768;960&format=avif&as=srcset";
import luxuryPlaceWebp from "@/assets/images/luxury/place-setting.jpg?w=480;768;960&format=webp&as=srcset";
import luxuryPlaceJpg from "@/assets/images/luxury/place-setting.jpg?w=960&format=jpg";
import luxurySocialAvif from "@/assets/images/luxury/social-celebration.jpg?w=480;768;1200&format=avif&as=srcset";
import luxurySocialWebp from "@/assets/images/luxury/social-celebration.jpg?w=480;768;1200&format=webp&as=srcset";
import luxurySocialJpg from "@/assets/images/luxury/social-celebration.jpg?w=1200&format=jpg";
import luxuryVenueAvif from "@/assets/images/luxury/venue-entrance.jpg?w=480;768;960&format=avif&as=srcset";
import luxuryVenueWebp from "@/assets/images/luxury/venue-entrance.jpg?w=480;768;960&format=webp&as=srcset";
import luxuryVenueJpg from "@/assets/images/luxury/venue-entrance.jpg?w=960&format=jpg";
import summerCorporateAvif from "@/assets/images/summer/corporate-gathering.jpg?w=480;768;1200&format=avif&as=srcset";
import summerCorporateWebp from "@/assets/images/summer/corporate-gathering.jpg?w=480;768;1200&format=webp&as=srcset";
import summerCorporateJpg from "@/assets/images/summer/corporate-gathering.jpg?w=1200&format=jpg";
import summerCustomAvif from "@/assets/images/summer/custom-theme.jpg?w=480;768;1200&format=avif&as=srcset";
import summerCustomWebp from "@/assets/images/summer/custom-theme.jpg?w=480;768;1200&format=webp&as=srcset";
import summerCustomJpg from "@/assets/images/summer/custom-theme.jpg?w=1200&format=jpg";
import summerGardenAvif from "@/assets/images/summer/garden-celebration.jpg?w=480;768;1200&format=avif&as=srcset";
import summerGardenWebp from "@/assets/images/summer/garden-celebration.jpg?w=480;768;1200&format=webp&as=srcset";
import summerGardenJpg from "@/assets/images/summer/garden-celebration.jpg?w=1200&format=jpg";
import summerHeroAvif from "@/assets/images/summer/hero-celebration.jpg?w=480;768;960&format=avif&as=srcset";
import summerHeroWebp from "@/assets/images/summer/hero-celebration.jpg?w=480;768;960&format=webp&as=srcset";
import summerHeroJpg from "@/assets/images/summer/hero-celebration.jpg?w=960&format=jpg";
import summerDinnerAvif from "@/assets/images/summer/intimate-dinner.jpg?w=480;768;1200&format=avif&as=srcset";
import summerDinnerWebp from "@/assets/images/summer/intimate-dinner.jpg?w=480;768;1200&format=webp&as=srcset";
import summerDinnerJpg from "@/assets/images/summer/intimate-dinner.jpg?w=1200&format=jpg";
import summerPlaceAvif from "@/assets/images/summer/place-setting.jpg?w=480;768;1200&format=avif&as=srcset";
import summerPlaceWebp from "@/assets/images/summer/place-setting.jpg?w=480;768;1200&format=webp&as=srcset";
import summerPlaceJpg from "@/assets/images/summer/place-setting.jpg?w=1200&format=jpg";
import summerSocialAvif from "@/assets/images/summer/social-celebration.jpg?w=480;768;1200&format=avif&as=srcset";
import summerSocialWebp from "@/assets/images/summer/social-celebration.jpg?w=480;768;1200&format=webp&as=srcset";
import summerSocialJpg from "@/assets/images/summer/social-celebration.jpg?w=1200&format=jpg";
import summerVenueAvif from "@/assets/images/summer/venue-entrance.jpg?w=480;768;960&format=avif&as=srcset";
import summerVenueWebp from "@/assets/images/summer/venue-entrance.jpg?w=480;768;960&format=webp&as=srcset";
import summerVenueJpg from "@/assets/images/summer/venue-entrance.jpg?w=960&format=jpg";

export type ImageAsset = {
  avif?: string;
  webp?: string;
  fallback: string;
  width: number;
  height: number;
};

export type ThemeImageAsset = { luxury: ImageAsset; summer: ImageAsset };

const image = (
  avif: string,
  webp: string,
  fallback: string,
  width: number,
  height: number,
): ImageAsset => ({ avif, webp, fallback, width, height });

export const imageAssets = {
  heroCelebration: {
    luxury: image(luxuryHeroAvif, luxuryHeroWebp, luxuryHeroJpg, 1086, 1448),
    summer: image(summerHeroAvif, summerHeroWebp, summerHeroJpg, 1086, 1448),
  },
  socialCelebration: {
    luxury: image(luxurySocialAvif, luxurySocialWebp, luxurySocialJpg, 1448, 1086),
    summer: image(summerSocialAvif, summerSocialWebp, summerSocialJpg, 1448, 1086),
  },
  corporateGathering: {
    luxury: image(luxuryCorporateAvif, luxuryCorporateWebp, luxuryCorporateJpg, 1448, 1086),
    summer: image(summerCorporateAvif, summerCorporateWebp, summerCorporateJpg, 1448, 1086),
  },
  customTheme: {
    luxury: image(luxuryCustomAvif, luxuryCustomWebp, luxuryCustomJpg, 1448, 1086),
    summer: image(summerCustomAvif, summerCustomWebp, summerCustomJpg, 1448, 1086),
  },
  venueEntrance: {
    luxury: image(luxuryVenueAvif, luxuryVenueWebp, luxuryVenueJpg, 1122, 1402),
    summer: image(summerVenueAvif, summerVenueWebp, summerVenueJpg, 1122, 1402),
  },
  intimateDinner: {
    luxury: image(luxuryDinnerAvif, luxuryDinnerWebp, luxuryDinnerJpg, 1254, 1254),
    summer: image(summerDinnerAvif, summerDinnerWebp, summerDinnerJpg, 1254, 1254),
  },
  placeSetting: {
    luxury: image(luxuryPlaceAvif, luxuryPlaceWebp, luxuryPlaceJpg, 1122, 1402),
    summer: image(summerPlaceAvif, summerPlaceWebp, summerPlaceJpg, 1254, 1254),
  },
  gardenCelebration: {
    luxury: image(luxuryGardenAvif, luxuryGardenWebp, luxuryGardenJpg, 1254, 1254),
    summer: image(summerGardenAvif, summerGardenWebp, summerGardenJpg, 1254, 1254),
  },
} as const satisfies Record<string, ThemeImageAsset>;
