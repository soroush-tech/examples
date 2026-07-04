import { Link, useLoaderData, useRouteError } from '@remix-run/react'

type Status = { ok: boolean; region: string; servedAt: string }

// The same server-side fetch. Under `remix vite:dev` the loader re-runs on every request, so
// refreshing updates `servedAt` — each response comes from the plugin's msw/node server.
export async function loader() {
  const res = await fetch('https://api.example.test/status')
  if (!res.ok) throw new Response('Could not load status', { status: 502 })
  return { status: (await res.json()) as Status }
}

export default function StatusRoute() {
  const { status } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>Server-rendered status, mocked</h1>
      <p>
        Run <code>npm run dev</code> and refresh — <code>servedAt</code> changes each request
        because the loader re-runs on the server and the plugin mocks it.
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
