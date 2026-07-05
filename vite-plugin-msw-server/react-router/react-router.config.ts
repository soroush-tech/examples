import type { Config } from '@react-router/dev/config'

export default {
  ssr: true,
  // Prerender these routes to static HTML at build time (SSG). React Router runs this
  // *inside the Vite build*, so the plugin's `buildStart` msw server covers the loaders.
  // https://reactrouter.com/start/framework/rendering#static-pre-rendering
  prerender: ['/', '/status'],
} satisfies Config
