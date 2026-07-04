import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export type Status = { ok: boolean; region: string; servedAt: string }

// The same server-side fetch. Under `vite dev` the load re-runs on every request, so
// refreshing updates `servedAt` — each response comes from the plugin's msw/node server. A
// failed fetch hands off to `+error.svelte`.
export const load: PageServerLoad = async () => {
  try {
    const res = await fetch('https://api.example.test/status')
    if (!res.ok) throw new Error(`Unexpected response: ${res.status}`)
    return { status: (await res.json()) as Status }
  } catch (cause) {
    console.error('Status API call failed:', cause)
    throw error(502, 'Could not load status — the API was unreachable.')
  }
}
