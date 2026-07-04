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
| `astro` | **Astro (Vite + SSG/SSR)** | Server-side fetches mocked during `astro dev` and `astro build`, verified with a Playwright e2e test | `npm run dev` · `build` · `preview` · `test:e2e` |
| `vike`  | **Vike + React (Vite + SSG/SSR)** | The same demo on Vike, with the fetches streamed through `<Suspense>` + an error boundary; mocked during `vike dev` and prerendered by `vike build`, verified with a Playwright e2e test | `npm run dev` · `build` · `preview` · `test:e2e` |

Both examples share the same mocks and pages to show the plugin is host-agnostic across
Vite-powered frameworks. The Vike one additionally wraps the server-side fetch in a
`<Suspense>` boundary with a React error boundary, so it also demonstrates loading and error
states.

## Why not Next.js?

The plugin hooks into **Vite's** dev/build pipeline (`configureServer` + `buildStart`), so
it only works where server-side rendering runs inside the Vite/Node process. Next.js runs
on Webpack/Turbopack, not Vite, so the plugin has nothing to hook into there. Suitable
hosts are Vite-powered SSR/SSG frameworks — Astro and Vike (both here), SvelteKit, Nuxt,
Remix (Vite), or vanilla Vite SSR.
