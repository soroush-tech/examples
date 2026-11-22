import { createStyle } from '@umber-style/react'
import { brandTheme, darkTheme, lightTheme } from './theme'

// One style for the page, imported by the prerender and by the browser, so both make the same class
// names. The page is extracted into one style element in the head, so the React build renders none.
export const { styled, ThemeProvider, StyleSheet, useStyle, Global, globalStyles, themeClass, cache } =
  createStyle(lightTheme, { prefix: 'umber', hasServerStyleElements: false })

// Asking for a theme class makes its rule, so every theme <html> can switch to is asked for here.
export const themeClasses = {
  light: themeClass(lightTheme, 'light'),
  dark: themeClass(darkTheme, 'dark'),
  brand: themeClass(brandTheme, 'light'),
}

export type ThemeName = keyof typeof themeClasses

export const STORAGE_KEY = 'umber-static-theme'

export const isThemeName = (value: unknown): value is ThemeName =>
  typeof value === 'string' && Object.hasOwn(themeClasses, value)
