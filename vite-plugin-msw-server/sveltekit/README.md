# SvelteKit · vite-plugin-msw-server

A standalone [SvelteKit](https://svelte.dev/docs/kit) app that uses
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
to resolve **server-side** `fetch` calls against [msw](https://mswjs.io) mocks during
`vite dev`. Each route's `+page.server.ts` load runs on the server, and the plugin — started
via Vite's `configureServer` hook — intercepts the fetch, so SSR is deterministic and never
depends on a live API.

## ⚠️ Dev only: SvelteKit prerendering is not covered

Unlike the [`astro`](../astro) and [`vike`](../vike) examples, this one is **dev-time only**.

SvelteKit runs its build-time **prerender in a separate Node process** (`@sveltejs/kit`'s
postbuild worker), which never loads the Vite plugins — so the plugin's msw server isn't
listening there, and `vite build` prerendering would hit the real network. The plugin's
`buildStart` hook only helps frameworks whose prerender runs *inside* the Vite build (Astro,
Vike). This example therefore server-renders (SSR, `adapter-node`) and demonstrates the
`vite dev` path.

> **Want mocks during SvelteKit prerender/SSG too?** Start msw from `src/hooks.server.ts`
> instead — that module loads in every SvelteKit server context, including the prerender
> worker. That's outside what this plugin does.

## Run it

```sh
npm install
npm run dev      # open the printed URL; visit / and /status
```

Refresh `/status` — `servedAt` changes each request because the load re-runs on the server
and the plugin mocks it every time.

```sh
npx playwright install chromium   # once
npm run test:e2e                  # runs the dev server, asserts mocked content in a browser
```

The e2e run forces `MSW_ACTIVE=true` via Playwright's `webServer.env`, so it's deterministic
regardless of your local `.env`.

## What to look at

| File                              | What it shows                                                            |
| --------------------------------- | ------------------------------------------------------------------------ |
| `.env`                            | `MSW_ACTIVE` — toggles the plugin; shell vars override it                 |
| `vite.config.ts`                  | The plugin in Vite's `plugins`, gated by `enable`, reading `MSW_ACTIVE`   |
| `src/routes/+layout.ts`           | `ssr: true`, `prerender: false` — server-render, don't prerender          |
| `src/mocks/handlers.ts`           | Your msw request handlers                                                 |
| `src/mocks/server.ts`             | `setupServer(...handlers)` — the msw/node server you hand the plugin       |
| `src/routes/+page.server.ts`      | Server load fetching the product list → mocked                            |
| `src/routes/status/+page.server.ts` | Server load fetching the live status payload → mocked                   |
| `src/routes/+error.svelte`        | The error state SvelteKit renders when a load throws (the plugin-off case) |
| `e2e/mocked-content.e2e.ts`       | Playwright test asserting the mocked data reached the SSR output          |

## Loading and error states

SvelteKit handles these with framework conventions rather than a component boundary:

- **Loading:** navigations wait on the server load; SvelteKit exposes progress via
  [`$app/state`'s `navigating`](https://svelte.dev/docs/kit/$app-state) if you want a
  spinner. On first paint the data is already server-rendered — there's no client loading flash.
- **Error:** a load that throws (via `error()`) unwinds to the nearest **`+error.svelte`**,
  the SvelteKit parallel to a React error boundary.

## Prove the plugin is doing the work

The mocks target `https://api.example.test`, a reserved TLD that never resolves. Turn the
plugin off and the dev-time fetch has no live API to reach:

```sh
MSW_ACTIVE=false npm run dev   # visit / — the load throws, +error.svelte renders
```

With the plugin on (via the e2e's `MSW_ACTIVE=true`, or set it yourself), the same load
resolves against the mocks and the page server-renders the data. That gap is exactly what the
plugin buys you.

> **Not a production runtime.** The plugin only runs inside `vite dev`. On a built SvelteKit
> server (`adapter-node`) or any real deploy it is not running, so those fetches would hit
> your real API — by design.
