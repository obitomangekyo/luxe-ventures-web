// Vite resolves these query imports through vite-imagetools at build time.
// TypeScript cannot resolve the generated virtual modules statically.
// @ts-nocheck

import ballroomEntranceAvif from "@/assets/images/luxe-ventures/ballroom-entrance.jpg?w=480;768;1200&format=avif&as=srcset";
import ballroomEntranceWebp from "@/assets/images/luxe-ventures/ballroom-entrance.jpg?w=480;768;1200&format=webp&as=srcset";
import ballroomEntranceJpg from "@/assets/images/luxe-ventures/ballroom-entrance.jpg?w=1200&format=jpg";
import corporateGalaAvif from "@/assets/images/luxe-ventures/corporate-gala.jpg?w=480;768;1200&format=avif&as=srcset";
import corporateGalaWebp from "@/assets/images/luxe-ventures/corporate-gala.jpg?w=480;768;1200&format=webp&as=srcset";
import corporateGalaJpg from "@/assets/images/luxe-ventures/corporate-gala.jpg?w=1200&format=jpg";
import customThemeAvif from "@/assets/images/luxe-ventures/custom-theme.jpg?w=480;768;1200&format=avif&as=srcset";
import customThemeWebp from "@/assets/images/luxe-ventures/custom-theme.jpg?w=480;768;1200&format=webp&as=srcset";
import customThemeJpg from "@/assets/images/luxe-ventures/custom-theme.jpg?w=1200&format=jpg";
import gardenCelebrationAvif from "@/assets/images/luxe-ventures/garden-celebration.jpg?w=480;768;1200&format=avif&as=srcset";
import gardenCelebrationWebp from "@/assets/images/luxe-ventures/garden-celebration.jpg?w=480;768;1200&format=webp&as=srcset";
import gardenCelebrationJpg from "@/assets/images/luxe-ventures/garden-celebration.jpg?w=1200&format=jpg";
import heroReceptionAvif from "@/assets/images/luxe-ventures/hero-reception.jpg?w=480;768;1200;1600&format=avif&as=srcset";
import heroReceptionWebp from "@/assets/images/luxe-ventures/hero-reception.jpg?w=480;768;1200;1600&format=webp&as=srcset";
import heroReceptionJpg from "@/assets/images/luxe-ventures/hero-reception.jpg?w=1600&format=jpg";
import intimateDinnerAvif from "@/assets/images/luxe-ventures/intimate-dinner.jpg?w=480;768;1200&format=avif&as=srcset";
import intimateDinnerWebp from "@/assets/images/luxe-ventures/intimate-dinner.jpg?w=480;768;1200&format=webp&as=srcset";
import intimateDinnerJpg from "@/assets/images/luxe-ventures/intimate-dinner.jpg?w=1200&format=jpg";
import placeSettingAvif from "@/assets/images/luxe-ventures/place-setting.jpg?w=480;768;1200&format=avif&as=srcset";
import placeSettingWebp from "@/assets/images/luxe-ventures/place-setting.jpg?w=480;768;1200&format=webp&as=srcset";
import placeSettingJpg from "@/assets/images/luxe-ventures/place-setting.jpg?w=1200&format=jpg";
import socialCelebrationAvif from "@/assets/images/luxe-ventures/social-celebration.jpg?w=480;768;1200&format=avif&as=srcset";
import socialCelebrationWebp from "@/assets/images/luxe-ventures/social-celebration.jpg?w=480;768;1200&format=webp&as=srcset";
import socialCelebrationJpg from "@/assets/images/luxe-ventures/social-celebration.jpg?w=1200&format=jpg";

export type ImageAsset = { avif?: string; webp?: string; fallback: string };

export const imageAssets = {
  heroReception: { avif: heroReceptionAvif, webp: heroReceptionWebp, fallback: heroReceptionJpg },
  socialCelebration: {
    avif: socialCelebrationAvif,
    webp: socialCelebrationWebp,
    fallback: socialCelebrationJpg,
  },
  corporateGala: { avif: corporateGalaAvif, webp: corporateGalaWebp, fallback: corporateGalaJpg },
  customTheme: { avif: customThemeAvif, webp: customThemeWebp, fallback: customThemeJpg },
  ballroomEntrance: {
    avif: ballroomEntranceAvif,
    webp: ballroomEntranceWebp,
    fallback: ballroomEntranceJpg,
  },
  intimateDinner: {
    avif: intimateDinnerAvif,
    webp: intimateDinnerWebp,
    fallback: intimateDinnerJpg,
  },
  placeSetting: { avif: placeSettingAvif, webp: placeSettingWebp, fallback: placeSettingJpg },
  gardenCelebration: {
    avif: gardenCelebrationAvif,
    webp: gardenCelebrationWebp,
    fallback: gardenCelebrationJpg,
  },
} as const satisfies Record<string, ImageAsset>;
