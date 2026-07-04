export default Page

import React, { Suspense } from 'react'
import { useAsync } from 'react-streaming'
import { ErrorBoundary } from '../../src/components/ErrorBoundary'

type Status = { ok: boolean; region: string; servedAt: string }

function Page() {
  return (
    <main>
      <h1>Dev-time SSR, mocked</h1>
      <p>
        Run <code>npm run dev</code> and refresh — <code>servedAt</code> changes each request
        because the fetch re-runs on the server and the plugin mocks it. It streams in behind
        a <code>&lt;Suspense&gt;</code> boundary, with an <code>&lt;ErrorBoundary&gt;</code>{' '}
        fallback if the request fails.
      </p>
      <ErrorBoundary
        fallback={<p role="alert">⚠️ Couldn’t load status — the API was unreachable.</p>}
      >
        <Suspense fallback={<p>Loading status…</p>}>
          <StatusPanel />
        </Suspense>
      </ErrorBoundary>
      <p>
        <a href="/">← Back to the SSG demo</a>
      </p>
    </main>
  )
}

function StatusPanel() {
  const status = useAsync(['status'], async () => {
    const res = await fetch('https://api.example.test/status')
    if (!res.ok) throw new Error(`Unexpected response: ${res.status}`)
    return (await res.json()) as Status
  })

  return (
    <dl>
      <dt>ok</dt>
      <dd>{String(status.ok)}</dd>
      <dt>region</dt>
      <dd>{status.region}</dd>
      <dt>servedAt</dt>
      <dd>{status.servedAt}</dd>
    </dl>
  )
}
