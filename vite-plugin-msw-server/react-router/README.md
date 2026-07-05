# React Router v7 · vite-plugin-msw-server

A standalone [React Router v7](https://reactrouter.com) (framework mode) app that uses
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
to resolve **server-side** `fetch` calls against [msw](https://mswjs.io) mocks — in both
moments the plugin covers:

- **`react-router dev` (SSR):** each route's `loader` runs on the server per request. The
  plugin starts msw via Vite's `configureServer` hook, so those fetches are mocked.
- **`react-router build` (SSG prerender):** the routes in `prerender` (`react-router.config.ts`)
  are rendered once at build time. React Router runs this **inside the Vite build**, so the
  plugin's `buildStart` hook has msw listening and the static HTML is deterministic.

React Router v7 is Vite-powered and prerenders in-process, which is why — unlike Remix v2 —
it gets **full dev + build coverage**, the same as the [`astro`](../astro) and [`vike`](../vike)
examples. (This is the Remix successor; Remix v2's `remix-ssg` uses the classic compiler and
can't be hooked by a Vite plugin.)

## Run it

```sh
npm install
npm run dev      # open the printed URL; visit / and /status
```

```sh
npm run build    # prerenders / and /status to build/client/*.html using the mocks
npm run start    # serve the built app
```

```sh
npx playwright install chromium   # once
npm run test:e2e                  # builds, serves, asserts mocked content in a browser
```

The e2e run forces `MSW_ACTIVE=true` via Playwright's `webServer.env`, so the prerender is
deterministic regardless of your local `.env`.

## What to look at

| File                        | What it shows                                                            |
| --------------------------- | ------------------------------------------------------------------------ |
| `.env`                      | `MSW_ACTIVE` — toggles the plugin; shell vars override it                 |
| `vite.config.ts`            | The plugin in Vite's `plugins`, gated by `enable`, reading `MSW_ACTIVE`   |
| `react-router.config.ts`    | `prerender: ['/', '/status']` — turns the build into SSG                  |
| `mocks/handlers.ts`         | Your msw request handlers                                                 |
| `mocks/server.ts`           | `setupServer(...handlers)` — the msw/node server you hand the plugin       |
| `app/routes/home.tsx`       | Prerendered loader → mocked, with an `ErrorBoundary`                      |
| `app/routes/status.tsx`     | Prerendered loader → mocked (its timestamp freezes into the static HTML)  |
| `e2e/mocked-content.e2e.ts` | Playwright test asserting the mocked data reached the prerendered pages   |

## Loading and error states

- **Error:** a `loader` that throws a `Response` unwinds to the route's exported
  **`ErrorBoundary`** (via `useRouteError`) — the React Router parallel to a React error
  boundary. With the plugin off, the prerender can't reach the API and fails the build.
- **Loading:** loaders resolve before render, so prerendered HTML already has the data.
  Client navigations expose progress through `useNavigation()`.

## Prove the plugin is doing the work

The mocks target `https://api.example.test`, a reserved TLD that never resolves. Turn the
plugin off and the prerender has no live API to reach:

```sh
MSW_ACTIVE=false npm run build   # fails: fetch to api.example.test can't connect
```

With the plugin on, the same build prerenders the mocked data into static HTML. That gap is
exactly what the plugin buys you.

> **Not a production runtime.** The plugin only runs inside `react-router dev` and
> `react-router build`. On a deployed server (`react-router-serve`) it is not running, so
> non-prerendered loaders would hit your real API — by design. Keep `enable` off for
> production builds.
