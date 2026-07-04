import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import mswServer from '@soroush.tech/vite-plugin-msw-server'

// `.env` files are not loaded into `process.env` inside the Astro config, so read them
// with Vite's loadEnv here. Shell variables still take precedence over the file.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')

// On by default (see .env). Disable to prove the point: `MSW_ACTIVE=false npm run build`
// makes the plugin inert, and the build then fails because the mock-only API
// (api.example.test) can't be reached — which is exactly what the plugin protects you from.
const mockServerEnabled = env.MSW_ACTIVE !== 'false'

// Import the msw/node server only when enabled, at config load. A disabled build never
// imports msw or your handlers. (Astro spins up a throwaway Vite instance for its `sync`
// step, so resolve the mock here rather than lazily inside the plugin hook.)
const server = mockServerEnabled ? (await import('./src/mocks/server')).server : undefined

// The plugin is a Vite plugin, so it goes in Astro's `vite.plugins`. It starts an
// msw/node server inside the Vite/Node process: `configureServer` for `astro dev` (SSR)
// and `buildStart` for `astro build` (SSG prerender).
export default defineConfig({
  vite: {
    plugins: [
      mswServer({
        enable: mockServerEnabled,
        onUnhandledRequest: 'warn',
        server: server!,
      }),
    ],
  },
})
