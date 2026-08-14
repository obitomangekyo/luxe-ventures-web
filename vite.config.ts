import netlify from "@netlify/vite-plugin-tanstack-start";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import svgr from "vite-plugin-svgr";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    imagetools(),
    netlify(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr(),
  ],
});

export default config;
