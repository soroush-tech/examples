import { createStyle } from 'umber-style/react'
import { styleOptions } from './host'
import { lightTheme } from './theme'

// `umber-style/react` is the React binding on the web and the React Native binding under React
// Native's resolution (the `react-native` export condition). The import is the same on both.
export const { styled, ThemeProvider, StyleSheet, useStyle, themeClass, Global } = createStyle(
  lightTheme,
  styleOptions
)
