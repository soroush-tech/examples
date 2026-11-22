import { createStyle } from '@umber-style/react'
import { lightTheme } from './theme'

// createStyle infers the theme type from the object, so every style function below is typed with it.
export const {
  styled,
  ThemeProvider,
  useTheme,
  StyleSheet,
  useStyle,
  apply,
  css,
  keyframes,
  globalStyles,
  Global,
} = createStyle(lightTheme, { prefix: 'umber' })
