export default Page

import React from 'react'
import { useData } from 'vike-react/useData'
import type { Data } from './+data'

function Page() {
  const { status } = useData<Data>()
  return (
    <main>
      <h1>Dev-time SSR, mocked</h1>
      <p>
        Run <code>npm run dev</code> and refresh this page — <code>servedAt</code> changes
        each request because <code>+data.ts</code> re-runs on the server and the plugin mocks
        it.
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
        <a href="/">← Back to the SSG demo</a>
      </p>
    </main>
  )
}
