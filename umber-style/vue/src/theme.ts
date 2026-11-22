// The only colours of the example: every colour on the page comes from one of these themes.

export const lightTheme = {
  palette: {
    background: '#faf7f4',
    surface: '#ffffff',
    text: '#1f1a17',
    muted: '#6b625c',
    primary: '#8a4b2a',
    onPrimary: '#ffffff',
    border: '#d8cfc8',
  },
  space: [0, 4, 8, 16, 24, 32],
  radii: [0, 4, 8, 999],
  // Not a token: breakpoints are real values, written into the media rule itself.
  breakpoints: ['640px'],
}

export type AppTheme = typeof lightTheme

export const darkTheme: AppTheme = {
  ...lightTheme,
  palette: {
    background: '#121110',
    surface: '#1d1b19',
    text: '#f2eeea',
    muted: '#a39a93',
    primary: '#e0a07a',
    onPrimary: '#1a0f08',
    border: '#3a3633',
  },
}

// A nested theme gives only what it changes.
export const brandTheme = {
  palette: { surface: '#eef6f8', text: '#0f2a33', primary: '#2a6f8a', onPrimary: '#ffffff', border: '#b9d3dc' },
}
