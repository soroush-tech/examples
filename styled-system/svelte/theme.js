// A single source of design tokens. Every style prop in App.svelte resolves
// against this object — numbers index the array scales (space, fontSizes),
// strings look up the named scales (colors, radii, shadows, buttons).
export default {
  breakpoints: ['40em', '52em', '64em'],
  fonts: {
    body: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    heading: 'Georgia, "Times New Roman", serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  radii: {
    default: 8,
    pill: 9999,
  },
  shadows: {
    card: '0 1px 4px rgba(0, 0, 0, 0.12)',
  },
  colors: {
    text: '#11181c',
    background: '#f6f8fa',
    muted: '#5c6b73',
    primary: '#0077cc',
    white: '#ffffff',
  },
  // Variant scales: a whole style object pulled in via `variant: 'buttons.primary'`.
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
      borderRadius: 'default',
      '&:hover': { bg: '#0a85e0' },
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      border: '2px solid',
      borderColor: 'primary',
      borderRadius: 'default',
    },
  },
}
