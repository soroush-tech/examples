// https://vike.dev/data
export { data }
export type Data = Awaited<ReturnType<typeof data>>

// The `data()` hook runs on the server: during `vike dev` (per request) and during
// `vike build` (prerender). The plugin's msw/node server intercepts the fetch below, so
// the product list is deterministic and never depends on a live API — even at build time.
export type Product = { id: string; name: string; price: number }

const data = async () => {
  const res = await fetch('https://api.example.test/products')
  const products = (await res.json()) as Product[]
  return { products }
}
