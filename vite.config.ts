import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@lib": "/src/lib",
      "@static": "/static",
      "@stores": "/src/lib/stores",
    },
  },
});
