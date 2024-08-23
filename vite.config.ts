/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: "./stats.html", open: true }),
    chunkSplitPlugin({
      strategy: "single-vendor",
      customChunk: (args) => {
        // files into pages directory is export in single files
        let { file } = args;
        if (file.startsWith("src/routes/")) {
          file = file.substring(4);
          file = file.replace(/\.[^.$]+$/, "");
          return file;
        }
        return null;
      },
      customSplitting: {
        utils: [/src\/utils/],
        charts: [/node_modules\/chart\.js/],
        clerk: [/clerk/],
        "react-chartjs-2": [/node_modules\/react-chartjs-2/],
        radix: [/radix/],
        zod: [/zod/],
      },
    }),
  ],
  test: {},
  build: {
    // This is to suppress the warnings about sourcemaps when building
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }

        defaultHandler(warning);
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
