# Vike · vite-plugin-msw-server

A standalone [Vike](https://vike.dev) (+ React) app that uses
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
to resolve **server-side** `fetch` calls against [msw](https://mswjs.io) mocks — in both
moments the plugin covers:

- **`vike dev` (SSR):** each page's `+data.ts` hook runs on the server on every request. The
  plugin starts msw via Vite's `configureServer` hook, so those fetches are mocked.
- **`vike build` (SSG prerender):** with `prerender: true`, pages are rendered once at build
  time. The plugin starts msw via Vite's `buildStart` hook, so the static HTML is
  deterministic and never depends on a live API.

Vike is Vite-powered, which is why the plugin drops straight into `vite.config.ts`'s
`plugins`. This is the same demo as the [`astro`](../astro) example, ported to Vike.

## Run it

```sh
npm install
npm run dev      # open the printed URL; visit / and /status
```

```sh
npm run build    # prerenders to dist/ using the mocks
npm run preview  # serve the built static site on :3000
```

```sh
npx playwright install chromium   # once
npm run test:e2e                  # builds, previews, asserts mocked content in a browser
```

The e2e run forces `MSW_ACTIVE=true` via Playwright's `webServer.env`, so it's deterministic
regardless of your local `.env`.

## What to look at

| File                       | What it shows                                                            |
| -------------------------- | ------------------------------------------------------------------------ |
| `.env`                     | `MSW_ACTIVE` — toggles the plugin; shell vars override it                 |
| `vite.config.ts`           | The plugin in Vite's `plugins`, gated by `enable`, reading `MSW_ACTIVE`   |
| `pages/+config.ts`         | `prerender: true` — turns the build into SSG                             |
| `src/mocks/handlers.ts`    | Your msw request handlers                                                 |
| `src/mocks/server.ts`      | `setupServer(...handlers)` — the msw/node server you hand the plugin      |
| `pages/index/+data.ts`     | Build-time SSG fetch → mocked (see the prerendered `dist/client/index.html`) |
| `pages/status/+data.ts`    | Dev-time SSR fetch → mocked (refresh under `npm run dev`)                |
| `e2e/mocked-content.e2e.ts`| Playwright test asserting the mocked data reached the prerendered pages   |

## Prove the plugin is doing the work

The mocks target `https://api.example.test`, a reserved TLD that never resolves. Turn the
plugin off and the build has no live API to fall back on:

```sh
MSW_ACTIVE=false npm run build   # fails: fetch to api.example.test can't connect
```

With the plugin on, the same build succeeds and is fully deterministic. That gap is exactly
what the plugin buys you.

> **Not a production runtime.** The plugin only runs inside `vike dev` and `vike build`. On a
> real on-demand/SSR deploy it is not running, so those fetches would hit your real API — by
> design. Keep `enable` off for production builds.
