import { Link, useLoaderData, useRouteError } from '@remix-run/react'

type Product = { id: string; name: string; price: number }

// A Remix `loader` runs on the server: during `remix vite:dev` it runs inside the Vite
// dev-server process, where the plugin's msw server is listening — so this fetch resolves
// against the mocks. A thrown Response unwinds to the route's `ErrorBoundary` below.
export async function loader() {
  const res = await fetch('https://api.example.test/products')
  if (!res.ok) throw new Response('Could not load products', { status: 502 })
  return { products: (await res.json()) as Product[] }
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>Server-rendered products, mocked</h1>
      <p>
        The list below is fetched in a server <code>loader</code> during{' '}
        <code>remix vite:dev</code> and resolved against msw mocks — no live API in sight. If
        the fetch fails, the loader throws and the <code>ErrorBoundary</code> renders instead.
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
