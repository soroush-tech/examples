import { createStyle } from '@umber-style/vue'
import isPropValid from '@umber-style/is-prop-valid/vue'
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

// Global styles: rules that are not a class. Tokens are variables, so they follow a theme switch.
export const base = globalStyles((theme) => ({
  '*, *::before, *::after': { boxSizing: 'border-box' },
  body: {
    margin: 0,
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
    fontFamily: 'system-ui, sans-serif',
    lineHeight: 1.5,
  },
}))

const pulse = keyframes({ '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.3 } }, { label: 'pulse' })

export const Page = styled('main', { name: 'Page' })(({ theme }) => ({
  maxWidth: 960,
  margin: '0 auto',
  padding: theme.space[4],
  display: 'grid',
  gap: theme.space[4],
}))

// A responsive value: one column, then three from the first breakpoint up.
export const Grid = styled('div', { name: 'Grid' })(({ theme }) => ({
  display: 'grid',
  gap: theme.space[3],
  gridTemplateColumns: '1fr',
  [`@media (min-width: ${theme.breakpoints[0]})`]: { gridTemplateColumns: 'repeat(3, 1fr)' },
}))

export const Card = styled('section', { name: 'Card' })(({ theme }) => ({
  display: 'grid',
  alignContent: 'start',
  gap: theme.space[2],
  padding: theme.space[3],
  backgroundColor: theme.palette.surface,
  color: theme.palette.text,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.radii[2],
}))

export const Title = styled('h2', { name: 'Title' })({ margin: 0, fontSize: 18 })

// A variant by attribute. Vue forwards every attribute to the element unless a filter says otherwise:
// the filter of the Vue entry keeps `variant`, which only the style reads, off the button.
export const Button = styled('button', { name: 'Button', shouldForwardProp: isPropValid })(
  ({ theme }) => ({
    font: 'inherit',
    cursor: 'pointer',
    borderRadius: theme.radii[2],
    padding: `${theme.space[2]} ${theme.space[3]}`,
    '&:hover': { opacity: 0.8 },
    '&:focus-visible': { outline: `3px solid ${theme.palette.text}`, outlineOffset: 2 },
  }),
  ({ theme, variant }) =>
    variant === 'outline'
      ? {
          backgroundColor: 'transparent',
          color: theme.palette.primary,
          border: `1px solid ${theme.palette.primary}`,
        }
      : {
          backgroundColor: theme.palette.primary,
          color: theme.palette.onPrimary,
          border: '1px solid transparent',
        }
)

export const Input = styled('input', { name: 'Input' })(({ theme }) => ({
  font: 'inherit',
  padding: theme.space[2],
  color: theme.palette.text,
  backgroundColor: theme.palette.background,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.radii[1],
  '&:focus': { outline: 'none', borderColor: theme.palette.primary },
}))

export const Dot = styled('span', { name: 'Dot' })(({ theme }) => ({
  display: 'inline-block',
  width: 12,
  height: 12,
  borderRadius: theme.radii[3],
  backgroundColor: theme.palette.primary,
  animation: `${pulse} 1.5s ease-in-out infinite`,
}))

// Sheet entries, given to a styled component through `style`: merged into one class, no style attribute.
export const sheet = StyleSheet.create((theme) => ({
  selected: { borderColor: theme.palette.primary, boxShadow: `0 0 0 2px ${theme.palette.primary}` },
  roomy: { padding: theme.space[4] },
}))

// One style made once, for a plain element through `apply`.
export const note = css({ margin: 0, fontSize: 14, fontStyle: 'italic', opacity: 0.8 })
