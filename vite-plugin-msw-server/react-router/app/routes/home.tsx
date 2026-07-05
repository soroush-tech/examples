import { Link, useLoaderData, useRouteError } from 'react-router'

type Product = { id: string; name: string; price: number }

// The loader runs on the server: during `react-router dev` (per request) and at build time
// when React Router prerenders this route. Both run inside the Vite process, so the plugin's
// msw server intercepts this fetch. A thrown Response unwinds to `ErrorBoundary`.
export async function loader() {
  const res = await fetch('https://api.example.test/products')
  if (!res.ok) throw new Response('Could not load products', { status: 502 })
  return { products: (await res.json()) as Product[] }
}

export default function Home() {
  const { products } = useLoaderData() as { products: Product[] }
  return (
    <main>
      <h1>Prerendered products, mocked</h1>
      <p>
        This list is fetched in a server <code>loader</code> and prerendered to static HTML by{' '}
        <code>react-router build</code> — resolved against msw mocks, no live API in sight.
      </p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — ${product.price}
          </li>
        ))}
      </ul>
      <p>
        <Link to="/status">See the status demo →</Link>
      </p>
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const message = error instanceof Response ? error.statusText || 'Request failed' : String(error)
  return (
    <main>
      <h1>⚠️ Couldn’t load products</h1>
      <p role="alert">{message} — the API was unreachable.</p>
      <p>
        <Link to="/">Back to the demo</Link>
      </p>
    </main>
  )
}
