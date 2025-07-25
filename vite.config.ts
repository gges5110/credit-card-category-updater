import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/credit-card-category-updater/",
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
