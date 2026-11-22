'use server'

import { cookies } from 'next/headers'
import { readScheme, SCHEME_COOKIE } from './scheme'

// A server action, not a client component: the form posts, the cookie changes, and Next renders the
// layout again with the other theme. It works with scripting disabled too.
export async function setScheme(form: FormData) {
  const scheme = readScheme(form.get('scheme')?.toString())
  ;(await cookies()).set(SCHEME_COOKIE, scheme, { path: '/', maxAge: 60 * 60 * 24 * 365 })
}
