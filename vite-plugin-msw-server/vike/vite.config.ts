import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { defineConfig, loadEnv } from 'vite'
import mswServer from '@soroush.tech/vite-plugin-msw-server'

// On by default (see .env). Disable to prove the point: `MSW_ACTIVE=false npm run build`
// makes the plugin inert, and the build then fails because the mock-only API
// (api.example.test) can't be reached — which is exactly what the plugin protects you from.
export default defineConfig(async ({ mode }) => {
  // `.env` values aren't on `process.env` in the Vite config, so read them with loadEnv.
  // Shell variables still take precedence over the file.
  const env = loadEnv(mode, process.cwd(), '')
  const mockServerEnabled = env.MSW_ACTIVE !== 'false'

  // Import the msw/node server only when enabled. A disabled build never imports msw or
  // your handlers.
  const server = mockServerEnabled ? (await import('./src/mocks/server')).server : undefined

  return {
    plugins: [
      react(),
      vike(),
      // The plugin starts an msw/node server inside the Vite/Node process: `configureServer`
      // for `vike dev` (SSR) and `buildStart` for `vike build` (SSG prerender).
      mswServer({
        enable: mockServerEnabled,
        onUnhandledRequest: 'warn',
        server: server!,
      }),
    ],
  }
})
