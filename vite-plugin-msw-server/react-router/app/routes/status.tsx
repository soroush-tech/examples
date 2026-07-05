import { Link, useLoaderData, useRouteError } from 'react-router'

type Status = { ok: boolean; region: string; servedAt: string }

// Same server-side fetch. Prerendered at build time (the timestamp freezes into the static
// HTML); under `react-router dev` the loader re-runs per request so `servedAt` changes.
export async function loader() {
  const res = await fetch('https://api.example.test/status')
  if (!res.ok) throw new Response('Could not load status', { status: 502 })
  return { status: (await res.json()) as Status }
}

export default function StatusRoute() {
  const { status } = useLoaderData() as { status: Status }
  return (
    <main>
      <h1>Prerendered status, mocked</h1>
      <p>
        Prerendered at build time from the mock. Under <code>npm run dev</code> the loader
        re-runs per request, so <code>servedAt</code> changes on refresh.
      </p>
      <dl>
        <dt>ok</dt>
        <dd>{String(status.ok)}</dd>
        <dt>region</dt>
        <dd>{status.region}</dd>
        <dt>servedAt</dt>
        <dd>{status.servedAt}</dd>
      </dl>
      <p>
        <Link to="/">← Back to the products demo</Link>
      </p>
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const message = error instanceof Response ? error.statusText || 'Request failed' : String(error)
  return (
    <main>
      <h1>⚠️ Couldn’t load status</h1>
      <p role="alert">{message} — the API was unreachable.</p>
      <p>
        <Link to="/">Back to the demo</Link>
      </p>
    </main>
  )
}
