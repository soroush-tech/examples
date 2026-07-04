export { config }

import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

const config = {
  // https://vike.dev/extends
  extends: vikeReact,
  // Server-side render every page (default), then...
  ssr: true,
  // ...prerender them to static HTML at build time. This is the SSG moment the plugin's
  // `buildStart` hook covers: the `useAsync` fetches below resolve against the msw mocks.
  // https://vike.dev/prerender
  prerender: true,
  // Stream the SSR/prerender output so `<Suspense>` boundaries can render a loading
  // fallback first and stream in the resolved data (via react-streaming's `useAsync`).
  // https://vike.dev/stream
  stream: true,
  title: 'vite-plugin-msw-server · Vike',
} satisfies Config
