import { defineConfig } from '@playwright/test'

// The plugin runs inside `remix vite:dev` (SSR), not the built server, so the e2e runs the
// dev server (where the plugin's msw server is listening) and checks that the server-rendered
// HTML contains the mocked data.
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  webServer: {
    command: 'npm run dev -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Force the plugin on for e2e, independent of `.env`. Real env vars win over `.env` in
    // the config's loadEnv, so the run is deterministic even if MSW is off by default locally.
    env: { MSW_ACTIVE: 'true' },
  },
  use: { baseURL: 'http://localhost:4173' },
})
