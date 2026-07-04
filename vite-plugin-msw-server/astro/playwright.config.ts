import { defineConfig } from '@playwright/test'

// Build the site (the plugin runs at `buildStart`, baking mocks into static HTML) and
// serve it with `astro preview`. The plugin is not running at test time — Playwright
// asserts the *prerendered output*, which proves the mocks made it into the build.
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Force the plugin on for e2e only, independent of `.env`. Real env vars win over
    // `.env` in the config's loadEnv, so the build is deterministic even if MSW is off
    // by default locally.
    env: { MSW_ACTIVE: 'true' },
  },
  use: { baseURL: 'http://localhost:4321' },
})
