import { reactRouter } from '@react-router/dev/vite'
import { defineConfig, loadEnv } from 'vite'
import mswServer from '@soroush.tech/vite-plugin-msw-server'

// On by default (see .env). Disable to prove the point: `MSW_ACTIVE=false npm run build`
// makes the plugin inert, and the prerender then fails because the mock-only API
// (api.example.test) can't be reached — which is exactly what the plugin protects you from.
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const mockServerEnabled = env.MSW_ACTIVE !== 'false'

  const server = mockServerEnabled ? (await import('./mocks/server')).server : undefined

  return {
    plugins: [
      reactRouter(),
      // Starts an msw/node server inside the Vite process: `configureServer` for dev SSR and
      // `buildStart` for the build — which is when React Router prerenders the routes.
      mswServer({
        enable: mockServerEnabled,
        onUnhandledRequest: 'warn',
        server: server!,
      }),
    ],
  }
})
