/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "url";
const filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(filename);

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), svgr()],
    define: {
      _global: {},
      "import.meta.env.VITE_BUILD_DATE": new Date().getTime(),
    },
    resolve: {
      alias: {
        "@": path.resolve(_dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      // you might want to disable it, if you don't have tests that rely on CSS
      // since parsing CSS is slow
      css: true,
    },
  };
});
