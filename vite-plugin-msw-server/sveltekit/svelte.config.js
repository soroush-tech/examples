import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // Node adapter: pages are server-rendered (SSR), not prerendered. SvelteKit runs its
    // prerender step in a *separate* process that the Vite plugin can't reach, so this demo
    // targets the moment the plugin does cover for SvelteKit: `vite dev` SSR. See the README.
    adapter: adapter(),
  },
}
