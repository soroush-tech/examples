// The only colours of the example: every colour on the page comes from one of these themes.

const space = [0, 4, 8, 16, 24, 32]
const radii = [0, 4, 8, 999]

export const lightTheme = {
  palette: {
    background: '#faf7f4',
    surface: '#ffffff',
    text: '#1f1a17',
    muted: '#6b625c',
    primary: '#8a4b2a',
    onPrimary: '#ffffff',
    border: '#d8cfc8',
    danger: '#b3261e',
    onDanger: '#ffffff',
  },
  space,
  radii,
}

export type AppTheme = typeof lightTheme

export const darkTheme: AppTheme = {
  palette: {
    background: '#121110',
    surface: '#1d1b19',
    text: '#f2eeea',
    muted: '#a39a93',
    primary: '#e0a07a',
    onPrimary: '#1a0f08',
    border: '#3a3633',
    danger: '#ff8a80',
    onDanger: '#1a0f08',
  },
  space,
  radii,
}

export const brandTheme: AppTheme = {
  palette: {
    background: '#eef6f8',
    surface: '#ffffff',
    text: '#0f2a33',
    muted: '#4f6b74',
    primary: '#2a6f8a',
    onPrimary: '#ffffff',
    border: '#b9d3dc',
    danger: '#b3261e',
    onDanger: '#ffffff',
  },
  space,
  radii,
}

// Registered only when the button asks for it. A theme that goes on <html> gives every token the page
// uses: a token it leaves out has no value under its class.
export const sunsetTheme: AppTheme = {
  palette: {
    background: '#2b1a24',
    surface: '#3a2430',
    text: '#ffe9dc',
    muted: '#d9a99a',
    primary: '#ff8a5c',
    onPrimary: '#2b1a24',
    border: '#5a3a48',
    danger: '#ff6b6b',
    onDanger: '#2b1a24',
  },
  space,
  radii,
}

// The themes of the nested sections give only what they change; the rest comes from the theme above.
export const sandTheme = {
  palette: { surface: '#f6ead8', text: '#3b2a17', primary: '#9a5b13', border: '#e0c9a6' },
}
export const oceanTheme = {
  palette: { surface: '#dcecf5', text: '#0e2a3b', primary: '#1d5f8a', border: '#a9cbe0' },
}
export const forestTheme = {
  palette: { surface: '#e1f0e3', text: '#13301a', primary: '#2f7a3f', border: '#a8d1b0' },
}
