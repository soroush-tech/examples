import { createStyle } from '@umber-style/react'
import { lightTheme } from './theme'

// One style for the whole app. A server component imports it under the `react-server` condition and gets
// the server build; a client component gets the client build. Same prefix and theme, so both builds make
// the same class names.
export const { styled, ThemeProvider, Global, globalStyles, themeClass } = createStyle(lightTheme, {
  prefix: 'umber',
})

/** The page background follows the theme: a token is a variable, so a switch needs no new rule. */
export const base = globalStyles((theme) => ({
  '*, *::before, *::after': { boxSizing: 'border-box' },
  body: {
    margin: 0,
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
    fontFamily: 'system-ui, sans-serif',
  },
}))
