export default Page

import React from 'react'
import { useData } from 'vike-react/useData'
import type { Data } from './+data'

function Page() {
  const { products } = useData<Data>()
  return (
    <main>
      <h1>Build-time SSG, mocked</h1>
      <p>
        This list is fetched in <code>+data.ts</code> and rendered on the server. Run{' '}
        <code>npm run build</code> and open the prerendered HTML under{' '}
        <code>dist/client/index.html</code> — the products are baked in, resolved against msw
        mocks with no live API in sight.
      </p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — ${product.price}
          </li>
        ))}
      </ul>
      <p>
        <a href="/status">See the dev-time SSR demo →</a>
      </p>
    </main>
  )
}
