import { http, HttpResponse } from 'msw'

// A stable, mock-only origin. `.test` is a reserved TLD (RFC 6761) that never resolves, so
// with the plugin disabled these fetches fail fast — proving the plugin is what makes
// server-side rendering deterministic, rather than a real API happening to be reachable.
const API = 'https://api.example.test'

const products = [
  { id: 'kbd-01', name: 'Split Keyboard', price: 189 },
  { id: 'mse-02', name: 'Trackball Mouse', price: 79 },
  { id: 'mat-03', name: 'Desk Mat', price: 29 },
]

export const handlers = [
  http.get(`${API}/products`, () => HttpResponse.json(products)),
  http.get(`${API}/status`, () =>
    HttpResponse.json({ ok: true, region: 'mock-1', servedAt: new Date().toISOString() }),
  ),
]
