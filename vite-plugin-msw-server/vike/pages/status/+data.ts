// https://vike.dev/data
export { data }
export type Data = Awaited<ReturnType<typeof data>>

// The same server-side fetch, but this page highlights the *dev* moment. Under `vike dev`
// the hook re-runs on every request, so refreshing updates `servedAt` — each response comes
// from the plugin's msw/node server (started via Vite's `configureServer` hook). A
// production build prerenders this page too, freezing the timestamp; the per-request
// behaviour is a dev-time thing.
export type Status = { ok: boolean; region: string; servedAt: string }

const data = async () => {
  const res = await fetch('https://api.example.test/status')
  const status = (await res.json()) as Status
  return { status }
}
