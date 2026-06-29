import { type Theme } from '@soroush.tech/styled-system'

// A theme typed against the package's `Theme` contract. Its scales drive the value
// types of the style props across every demo — exactly like styled-system v5 +
// @types/styled-system. `breakpoints` is an array so array responsive values map to it.
export const theme = {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: { body: 400, heading: 700, bold: 700 },
  lineHeights: { body: 1.5, heading: 1.25 },
  fonts: { body: 'system-ui, sans-serif', heading: 'inherit', mono: 'monospace' },
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#0077cc',
    secondary: '#0055aa',
    white: '#ffffff',
  },
  sizes: { sm: '16px', md: '32px', container: '1024px' },
  radii: { none: 0, sm: 2, md: 6, pill: 9999 },
  shadows: { card: '0 1px 2px rgba(0, 0, 0, 0.2)' },
  // Variant scales (CSS-standard properties so they satisfy the theme contract).
  buttons: {
    primary: { color: '#ffffff', backgroundColor: '#0077cc' },
    secondary: { color: '#ffffff', backgroundColor: '#0055aa' },
  },
  textStyles: {
    heading: { fontWeight: 700, lineHeight: 1.25 },
  },
  colorStyles: {
    muted: { color: '#333333', backgroundColor: '#f6f6f6' },
  },
} satisfies Theme

export type AppTheme = typeof theme
