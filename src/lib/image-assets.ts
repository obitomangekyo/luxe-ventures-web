// Vite resolves these query imports through vite-imagetools at build time.
// TypeScript cannot resolve the generated virtual modules statically.
// @ts-nocheck

export type ImageAsset = { avif?: string; webp?: string; fallback: string };

export const imageAssets = {} as const satisfies Record<string, ImageAsset>;
