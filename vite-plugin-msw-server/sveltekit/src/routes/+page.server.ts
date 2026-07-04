import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export type Product = { id: string; name: string; price: number }

// `+page.server.ts` runs on the server. Under `vite dev` that's inside the Vite process,
// where the plugin's msw/node server is listening — so this fetch resolves against the mocks
// instead of a live API. If the request fails, `error()` hands off to the nearest
// `+error.svelte`.
export const load: PageServerLoad = async () => {
  try {
    const res = await fetch('https://api.example.test/products')
    if (!res.ok) throw new Error(`Unexpected response: ${res.status}`)
    return { products: (await res.json()) as Product[] }
  } catch (cause) {
    console.error('Product API call failed:', cause)
    throw error(502, 'Could not load products — the API was unreachable.')
  }
}
