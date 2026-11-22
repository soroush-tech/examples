import type { Scheme } from '../../theme'

export const SCHEME_COOKIE = 'scheme'

export const readScheme = (value: string | undefined): Scheme => (value === 'dark' ? 'dark' : 'light')
