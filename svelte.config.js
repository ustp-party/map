import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter(),
		alias: {
			$components: 'src/components',
			$lib: 'src/lib',
			$static: 'static',
			$stores: 'src/lib/stores',
			$utils: 'src/lib/utils',
			$routes: 'src/routes',
			$types: 'src/lib/types'
		}
	 },
	paths: {
		base: '/map-svelte'
	},
};

export default config;
