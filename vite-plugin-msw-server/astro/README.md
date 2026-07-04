# Astro · vite-plugin-msw-server

A standalone [Astro](https://astro.build) app that uses
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
to resolve **server-side** `fetch` calls against [msw](https://mswjs.io) mocks — in both
moments the plugin covers:

- **`astro dev` (SSR):** `.astro` frontmatter runs on the server on every request. The
  plugin starts msw via Vite's `configureServer` hook, so those fetches are mocked.
- **`astro build` (SSG prerender):** pages are rendered once at build time. The plugin
  starts msw via Vite's `buildStart` hook, so the static HTML is deterministic and never
  depends on a live API.

Astro is Vite-powered, which is why the plugin drops straight into `vite.plugins`.

## Run it

```sh
npm install
npm run dev      # open the printed URL; visit / and /status
```

```sh
npm run build    # prerenders to dist/ using the mocks
npm run preview  # serve the built static site
```

```sh
npx playwright install chromium   # once
npm run test:e2e                  # builds, previews, asserts mocked content in a browser
```

The e2e run forces `MSW_ACTIVE=true` via Playwright's `webServer.env`, so it's deterministic
regardless of your local `.env`.

## What to look at

| File                    | What it shows                                                                 |
| ----------------------- | ----------------------------------------------------------------------------- |
| `.env`                  | `MSW_ACTIVE` — toggles the plugin (on by default); shell vars override it      |
| `astro.config.ts`       | The plugin in `vite.plugins`, gated by `enable`, reading `MSW_ACTIVE`          |
| `src/mocks/handlers.ts` | Your msw request handlers                                                      |
| `src/mocks/server.ts`   | `setupServer(...handlers)` — the msw/node server you hand the plugin           |
| `src/pages/index.astro` | Build-time SSG fetch → mocked (open `dist/index.html` after a build)          |
| `src/pages/status.astro`| Dev-time SSR fetch → mocked (refresh under `npm run dev`)                     |
| `e2e/mocked-content.e2e.ts` | Playwright test asserting the mocked data reached the prerendered pages    |

## Prove the plugin is doing the work

The mocks target `https://api.example.test`, a reserved TLD that never resolves. Turn the
plugin off and the build has no live API to fall back on:

```sh
MSW_ACTIVE=false npm run build   # fails: fetch to api.example.test can't connect
```

With the plugin on (the default), the same build succeeds and is fully deterministic. That
gap is exactly what the plugin buys you.

> **Not a production runtime.** The plugin only runs inside `astro dev` and `astro build`.
> On a real on-demand/SSR deploy it is not running, so those fetches would hit your real
> API — by design. Keep `enable` off for production builds.
