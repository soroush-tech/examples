# vite-plugin-msw-server examples

Standalone demos for
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
— a Vite plugin that starts an [msw](https://mswjs.io)/node mock server inside the Vite
process, so **server-side** data fetching resolves against your mocks during dev (SSR) and
build (SSG prerender).

Each folder is its own app — `cd` into one, install, and run it:

```sh
npm install && npm run dev
```

## The examples

| Folder  | Stack                      | Demonstrates                                                       | Run                          |
| ------- | -------------------------- | ----------------------------------------------------------------- | ---------------------------- |
| `astro`     | **Astro (Vite + SSG/SSR)** | Server-side fetches mocked during `astro dev` and `astro build`, verified with a Playwright e2e test | `npm run dev` · `build` · `preview` · `test:e2e` |
| `vike`      | **Vike + React (Vite + SSG/SSR)** | The same demo on Vike, with the fetches streamed through `<Suspense>` + an error boundary; mocked during `vike dev` and prerendered by `vike build` | `npm run dev` · `build` · `preview` · `test:e2e` |
| `sveltekit` | **SvelteKit (Vite + SSR)** | The demo on SvelteKit — **dev-only** (see below), with a `+error.svelte` error state; mocked during `vite dev`, verified with a Playwright e2e test | `npm run dev` · `build` · `test:e2e` |
| `remix`     | **Remix (Vite + SSR)** | The demo on Remix — **dev-only**, with a route `ErrorBoundary` error state; loaders mocked during `remix vite:dev`, verified with a Playwright e2e test | `npm run dev` · `build` · `test:e2e` |

The examples share the same mocks and pages to show the plugin is host-agnostic across
Vite-powered frameworks. The Vike one additionally wraps the server-side fetch in a
`<Suspense>` boundary with a React error boundary; SvelteKit uses `+error.svelte` and Remix a
route `ErrorBoundary`.

## Dev vs. build coverage

The plugin hooks into **Vite's** dev/build pipeline: `configureServer` covers `vite dev`
(SSR) for every host, while `buildStart` covers **prerendering only when it runs inside the
Vite build** — as it does for Astro and Vike. Frameworks that render on their own server
runtime cover the **dev path only**:

- **Astro, Vike** — dev **and** build (prerender runs inside the Vite build). ✅ full
- **SvelteKit, Remix** — dev only. Their production output runs on a separate server
  (SvelteKit prerenders in a separate process; Remix serves via `remix-serve`), where the
  plugin isn't active. Each example's README has the details.
- **Nuxt** — **not supported.** Nuxt dev runs Vite and its Nitro SSR runtime in *separate*
  processes linked by a vite-node IPC socket; starting msw in the Vite process both misses
  the Nitro process (where `$fetch` runs) and deadlocks that socket. The fix is to start msw
  from a **Nitro plugin** instead — which is outside what this Vite plugin does (see the
  community [`nuxt-msw`](https://github.com/shunnNet/nuxt-msw) module).

## Why not Next.js?

Next.js runs on Webpack/Turbopack, not Vite, so the plugin has nothing to hook into there at
all — not even the dev path.
