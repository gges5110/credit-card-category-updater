import { defineConfig } from "vitest/config";

export default defineConfig({
  root: "./",
  test: {
    environment: "node",
    globals: true,
  },
  css: false, // Completely disable CSS processing
  plugins: [], // No plugins
});
