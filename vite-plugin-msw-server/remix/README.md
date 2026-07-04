# Remix · vite-plugin-msw-server

A standalone [Remix](https://remix.run) (Vite) app that uses
[`@soroush.tech/vite-plugin-msw-server`](https://www.npmjs.com/package/@soroush.tech/vite-plugin-msw-server)
to resolve **server-side** `fetch` calls against [msw](https://mswjs.io) mocks during
`remix vite:dev`. Each route's `loader` runs on the server, and the plugin — started via
Vite's `configureServer` hook — intercepts the fetch, so SSR is deterministic and never
depends on a live API.

Remix's Vite plugin runs SSR **inside the Vite dev-server process**, which is why the plugin
drops straight into `vite.config.ts`'s `plugins` and just works (no separate SSR process to
miss, unlike Nuxt).

## Dev-time coverage

The plugin only runs inside `remix vite:dev`. A production build (`remix vite:build` +
`remix-serve`) runs its own Node server where the plugin is **not** active — those fetches
would hit your real API, by design. So this demo, like the [`sveltekit`](../sveltekit) one,
targets the dev SSR path.

## Run it

```sh
npm install
npm run dev      # open the printed URL; visit / and /status
```

Refresh `/status` — `servedAt` changes each request because the loader re-runs on the server
and the plugin mocks it every time.

```sh
npx playwright install chromium   # once
npm run test:e2e                  # runs the dev server, asserts mocked content in a browser
```

The e2e run forces `MSW_ACTIVE=true` via Playwright's `webServer.env`, so it's deterministic
regardless of your local `.env`.

## What to look at

| File                       | What it shows                                                            |
| -------------------------- | ------------------------------------------------------------------------ |
| `.env`                     | `MSW_ACTIVE` — toggles the plugin; shell vars override it                 |
| `vite.config.ts`           | The plugin in Vite's `plugins`, gated by `enable`, reading `MSW_ACTIVE`   |
| `mocks/handlers.ts`        | Your msw request handlers                                                 |
| `mocks/server.ts`          | `setupServer(...handlers)` — the msw/node server you hand the plugin       |
| `app/routes/_index.tsx`    | Server `loader` fetching the product list → mocked, with an `ErrorBoundary` |
| `app/routes/status.tsx`    | Server `loader` fetching the live status payload → mocked                  |
| `e2e/mocked-content.e2e.ts`| Playwright test asserting the mocked data reached the SSR output          |

## Loading and error states

- **Error:** a `loader` that throws a `Response` unwinds to the route's exported
  **`ErrorBoundary`** (via `useRouteError`) — the Remix parallel to a React error boundary.
- **Loading:** Remix waits on the loader server-side, so the first paint already has the
  data. Client navigations expose progress through `useNavigation()` if you want a spinner.

## Prove the plugin is doing the work

The mocks target `https://api.example.test`, a reserved TLD that never resolves. Turn the
plugin off and the loader has no live API to reach:

```sh
MSW_ACTIVE=false npm run dev   # visit / — the loader throws, the ErrorBoundary renders
```

With the plugin on (via the e2e's `MSW_ACTIVE=true`, or set it yourself), the same loader
resolves against the mocks and the route server-renders the data. That gap is exactly what
the plugin buys you.
