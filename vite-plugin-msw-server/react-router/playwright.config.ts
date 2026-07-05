import { defineConfig } from '@playwright/test'

// Build the site (the plugin runs at `buildStart`, baking mocks into the prerendered HTML)
// and serve it with react-router-serve. The plugin is not running at test time — Playwright
// asserts the *prerendered output*, which proves the mocks made it into the build.
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Force the plugin on for the build, independent of `.env`. Real env vars win over `.env`
    // in the config's loadEnv, so the prerender is deterministic even if MSW is off locally.
    env: { MSW_ACTIVE: 'true' },
  },
  use: { baseURL: 'http://localhost:3000' },
})
