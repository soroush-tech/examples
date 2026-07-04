export default Page

import React, { Suspense } from 'react'
import { useAsync } from 'react-streaming'
import { ErrorBoundary } from '../../src/components/ErrorBoundary'

type Product = { id: string; name: string; price: number }

function Page() {
  return (
    <main>
      <h1>Build-time SSG, mocked</h1>
      <p>
        The list below is fetched on the server (during <code>vike dev</code> and prerendered
        by <code>vike build</code>) and resolved against msw mocks — no live API in sight. It
        streams in behind a <code>&lt;Suspense&gt;</code> boundary, and an{' '}
        <code>&lt;ErrorBoundary&gt;</code> shows a fallback if the request fails.
      </p>
      <ErrorBoundary
        fallback={
          <p role="alert">⚠️ Couldn’t load products — the API was unreachable.</p>
        }
      >
        <Suspense fallback={<p>Loading products…</p>}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
      <p>
        <a href="/status">See the dev-time SSR demo →</a>
      </p>
    </main>
  )
}

// `useAsync` (react-streaming) runs the fetch on the server, streams the result to the
// client, and suspends until it resolves. The plugin's msw/node server intercepts it.
function ProductList() {
  const products = useAsync(['products'], async () => {
    const res = await fetch('https://api.example.test/products')
    if (!res.ok) throw new Error(`Unexpected response: ${res.status}`)
    return (await res.json()) as Product[]
  })

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} — ${product.price}
        </li>
      ))}
    </ul>
  )
}
