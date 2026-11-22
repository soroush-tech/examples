// The only place that holds colours: every style reads them from the theme.

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
}

export const darkTheme = {
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

/** A partial theme for one section: the rest comes from the provider above. */
export const brandTheme = {
  palette: {
    surface: '#eef6f8',
    text: '#0f2a33',
    primary: '#2a6f8a',
    onPrimary: '#ffffff',
    border: '#b9d3dc',
  },
}

/** The light and the dark theme of a section that switches by itself, not with the page. */
export const forestTheme = {
  palette: {
    surface: '#eef7ee',
    text: '#12301a',
    primary: '#2e7d44',
    onPrimary: '#ffffff',
    border: '#b8d8bf',
  },
}

export const forestDarkTheme = {
  palette: {
    surface: '#12301a',
    text: '#e3f4e6',
    primary: '#86d39a',
    onPrimary: '#0a2110',
    border: '#2c5a38',
  },
}
