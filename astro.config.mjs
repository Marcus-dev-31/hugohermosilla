// astro.config.mjs

import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path from "path";
import sitemap from "@astrojs/sitemap";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://hugohermosilla.com",

  output: "static",

  compressHTML: true,

  build: {
    format: "file",
  },

  integrations: [sitemap()],

  vite: {
    server: {
      port: 4321,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },
  },
});
