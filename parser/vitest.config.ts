import { defineConfig } from "vitest/config";

export default defineConfig({
  root: "./src",
  test: {
    environment: "node",
    globals: true,
  },
});
