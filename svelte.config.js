import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.argv.includes("dev")
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
			base: dev ? '' : process.env.BASE_PATH
		},
    alias: {
      $components: "src/components",
      $lib: "src/lib",
      $static: "static",
      $stores: "src/lib/stores",
      $utils: "src/lib/utils",
      $routes: "src/routes",
      $types: "src/lib/types",
      $icons: "src/assets/material-icons",
      $assets: "src/assets",
      $styles: "src/lib/styles",
    },
  },
  paths: {
    base: dev ? '': process.env.BASE_PATH,
  },
};

export default config;
