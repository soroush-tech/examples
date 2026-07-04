# Vike · vite-plugin-msw-server

A standalone [Vike](https://vike.dev) (+ React) app that uses
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
to resolve **server-side** `fetch` calls against [msw](https://mswjs.io) mocks — in both
moments the plugin covers:

- **`vike dev` (SSR):** each page fetches on the server on every request. The plugin starts
  msw via Vite's `configureServer` hook, so those fetches are mocked.
- **`vike build` (SSG prerender):** with `prerender: true`, pages are rendered once at build
  time. The plugin starts msw via Vite's `buildStart` hook, so the static HTML is
  deterministic and never depends on a live API.

Vike is Vite-powered, which is why the plugin drops straight into `vite.config.ts`'s
`plugins`. This is the [`astro`](../astro) demo ported to Vike, plus a **`<Suspense>` +
error boundary** treatment of the fetch (see below).

## Loading and error states with Suspense

Each page fetches through [`react-streaming`](https://vike.dev/streaming)'s `useAsync` inside
a `<Suspense>` boundary, wrapped by an `<ErrorBoundary>`:

```tsx
<ErrorBoundary fallback={<p role="alert">⚠️ Couldn’t load products…</p>}>
  <Suspense fallback={<p>Loading products…</p>}>
    <ProductList />   {/* useAsync(['products'], () => fetch(...)) */}
  </Suspense>
</ErrorBoundary>
```

The fetch still runs **on the server** (so the plugin mocks it) and streams to the client —
`stream: true` in `pages/+config.ts` enables this. When the request **succeeds**, the data
resolves during prerender and is baked into the static HTML. When it **fails** (e.g. the API
is unreachable), the boundary renders the error fallback instead of crashing the render.

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
| `pages/+config.ts`         | `prerender: true` (SSG) and `stream: true` (Suspense streaming)          |
| `src/mocks/handlers.ts`    | Your msw request handlers                                                 |
| `src/mocks/server.ts`      | `setupServer(...handlers)` — the msw/node server you hand the plugin      |
| `src/components/ErrorBoundary.tsx` | Class error boundary that renders the fallback when a fetch throws |
| `pages/index/+Page.tsx`    | Build-time SSG fetch via `useAsync` → mocked, wrapped in Suspense + error boundary |
| `pages/status/+Page.tsx`   | Dev-time SSR fetch via `useAsync` → mocked (refresh under `npm run dev`) |
| `e2e/mocked-content.e2e.ts`| Playwright test asserting the mocked data reached the prerendered pages   |

## Prove the plugin is doing the work

The mocks target `https://api.example.test`, a reserved TLD that never resolves. Turn the
plugin off and the fetch has no live API to reach:

```sh
MSW_ACTIVE=false npm run build   # fetch to api.example.test fails (ENOTFOUND)
```

Because the fetch is wrapped in an error boundary, the build still completes — but the pages
degrade to the **error fallback** instead of the real data. With the plugin on, the same
build resolves the mocks and bakes the real data into the HTML. That gap is exactly what the
plugin buys you.

> Remove the `<ErrorBoundary>` and the plugin-off build hard-fails on the rejected fetch
> instead — which is what the [`astro`](../astro) example (no boundary) does.

> **Not a production runtime.** The plugin only runs inside `vike dev` and `vike build`. On a
> real on-demand/SSR deploy it is not running, so those fetches would hit your real API — by
> design. Keep `enable` off for production builds.
