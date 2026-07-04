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

The examples share the same mocks and pages to show the plugin is host-agnostic across
Vite-powered frameworks. The Vike one additionally wraps the server-side fetch in a
`<Suspense>` boundary with a React error boundary; the SvelteKit one uses `+error.svelte`.

## Dev vs. build coverage

The plugin hooks into **Vite's** dev/build pipeline: `configureServer` covers `vite dev`
(SSR) for every host, while `buildStart` covers **prerendering only when it runs inside the
Vite build** — as it does for Astro and Vike. SvelteKit runs its prerender in a *separate*
Node process that never loads Vite plugins, so there the plugin covers **`vite dev` only**
(the `sveltekit` example's README explains the workaround). Nuxt, Remix (Vite), and vanilla
Vite SSR are also suitable hosts for the dev path.

## Why not Next.js?

Next.js runs on Webpack/Turbopack, not Vite, so the plugin has nothing to hook into there at
all — not even the dev path.
