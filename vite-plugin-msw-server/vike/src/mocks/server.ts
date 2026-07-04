import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This is the msw/node server the plugin starts. You own it — the plugin only needs its
// structural `listen()` shape and carries no runtime dependency on msw.
export const server = setupServer(...handlers)
