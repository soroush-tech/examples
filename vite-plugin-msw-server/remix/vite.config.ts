import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig, loadEnv } from 'vite'
import mswServer from '@soroush.tech/vite-plugin-msw-server'

// On by default (see .env). Disable to prove the point: `MSW_ACTIVE=false npm run dev` makes
// the plugin inert, and the mock-only API (api.example.test) can't be reached — which is
// exactly what the plugin protects you from.
export default defineConfig(async ({ mode }) => {
  // `.env` values aren't on `process.env` in the Vite config, so read them with loadEnv.
  // Shell variables still take precedence over the file.
  const env = loadEnv(mode, process.cwd(), '')
  const mockServerEnabled = env.MSW_ACTIVE !== 'false'

  // Import the msw/node server only when enabled. A disabled run never imports msw.
  const server = mockServerEnabled ? (await import('./mocks/server')).server : undefined

  return {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true,
        },
      }),
      // Remix's Vite plugin runs SSR loaders inside the Vite dev-server process, so the msw
      // server this plugin starts (via `configureServer`) intercepts their fetches.
      mswServer({
        enable: mockServerEnabled,
        onUnhandledRequest: 'warn',
        server: server!,
      }),
    ],
  }
})
