// Server-render every page (SSR), and do not prerender. SvelteKit's build-time prerender
// runs in a separate Node process that the Vite plugin can't reach, so the plugin only mocks
// SvelteKit's *dev* SSR — which is what this demo exercises. See the README.
// https://svelte.dev/docs/kit/page-options
export const ssr = true
export const prerender = false
