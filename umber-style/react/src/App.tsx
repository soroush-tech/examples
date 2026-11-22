import { useState } from 'react'
import { brandTheme, darkTheme, lightTheme } from './theme'
import {
  apply,
  css,
  Global,
  globalStyles,
  keyframes,
  styled,
  StyleSheet,
  ThemeProvider,
  useStyle,
  useTheme,
} from './style'

// Global styles: rules that are not a class. Tokens are variables, so they follow a theme switch.
const base = globalStyles((theme) => ({
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

const Page = styled('main', { name: 'Page' })(({ theme }) => ({
  maxWidth: 960,
  margin: '0 auto',
  padding: theme.space[4],
  display: 'grid',
  gap: theme.space[4],
}))

// A responsive value: one column, then three from the first breakpoint up.
const Grid = styled('div', { name: 'Grid' })(({ theme }) => ({
  display: 'grid',
  gap: theme.space[3],
  gridTemplateColumns: '1fr',
  [`@media (min-width: ${theme.breakpoints[0]})`]: { gridTemplateColumns: 'repeat(3, 1fr)' },
}))

const Card = styled('section', { name: 'Card' })(({ theme }) => ({
  display: 'grid',
  alignContent: 'start',
  gap: theme.space[2],
  padding: theme.space[3],
  backgroundColor: theme.palette.surface,
  color: theme.palette.text,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.radii[2],
}))

const Title = styled('h2', { name: 'Title' })({ margin: 0, fontSize: 18 })

// A variant by prop. `variant` is not an HTML attribute, so the default filter keeps it off the element.
const Button = styled('button', { name: 'Button' })<{ variant?: 'solid' | 'outline' }>(
  ({ theme }) => ({
    font: 'inherit',
    cursor: 'pointer',
    borderRadius: theme.radii[2],
    padding: `${theme.space[2]} ${theme.space[3]}`,
    '&:hover': { opacity: 0.8 },
    '&:focus-visible': { outline: `3px solid ${theme.palette.text}`, outlineOffset: 2 },
  }),
  ({ theme, variant = 'solid' }) =>
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

const Input = styled('input', { name: 'Input' })(({ theme }) => ({
  font: 'inherit',
  padding: theme.space[2],
  color: theme.palette.text,
  backgroundColor: theme.palette.background,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.radii[1],
  '&:focus': { outline: 'none', borderColor: theme.palette.primary },
}))

const Dot = styled('span', { name: 'Dot' })(({ theme }) => ({
  display: 'inline-block',
  width: 12,
  height: 12,
  borderRadius: theme.radii[3],
  backgroundColor: theme.palette.primary,
  animation: `${pulse} 1.5s ease-in-out infinite`,
}))

// Sheet entries, given to a styled component through `style`: merged into one class, no style attribute.
const sheet = StyleSheet.create((theme) => ({
  selected: { borderColor: theme.palette.primary, boxShadow: `0 0 0 2px ${theme.palette.primary}` },
  roomy: { padding: theme.space[4] },
}))

// One style made once, for a plain element through `apply`.
const note = css({ margin: 0, fontSize: 14, fontStyle: 'italic', opacity: 0.8 })

function Swatch() {
  // The real values of the nearest provider, for JavaScript that needs a value, not for a style.
  const theme = useTheme()
  return <code data-testid="swatch">{theme.palette.primary}</code>
}

function SheetCard() {
  const styles = useStyle(sheet)
  const [isSelected, setIsSelected] = useState(false)
  return (
    <Card data-testid="sheet-card" style={[styles.roomy, isSelected && styles.selected]}>
      <Title>StyleSheet</Title>
      <p {...apply(note)}>Two sheet entries in the style prop of a styled component.</p>
      <Button variant="outline" aria-pressed={isSelected} onClick={() => setIsSelected(!isSelected)}>
        {isSelected ? 'Unselect' : 'Select'}
      </Button>
    </Card>
  )
}

export function App() {
  const [isDark, setIsDark] = useState(false)
  return (
    // The outermost provider declares its theme on :root. A new theme rewrites that one rule.
    <ThemeProvider theme={isDark ? darkTheme : lightTheme} colorScheme={isDark ? 'dark' : 'light'}>
      <Global styles={base} />
      <Page>
        <Card>
          <Title>
            UmberStyle with React <Dot data-testid="dot" />
          </Title>
          <p {...apply(note)}>
            Primary colour from useTheme: <Swatch />
          </p>
          <div>
            <Button data-testid="theme-switch" onClick={() => setIsDark(!isDark)}>
              {isDark ? 'Light theme' : 'Dark theme'}
            </Button>
          </div>
        </Card>
        <Grid data-testid="grid">
          <Card>
            <Title>Variants and states</Title>
            <Button data-testid="solid">Solid</Button>
            <Button data-testid="outline" variant="outline">
              Outline
            </Button>
            <Input data-testid="input" placeholder="Focus me" aria-label="Focus me" />
          </Card>
          <SheetCard />
          <ThemeProvider theme={brandTheme}>
            <Card data-testid="brand-card">
              <Title>Nested theme</Title>
              <p {...apply(note)}>
                Primary here: <Swatch />
              </p>
              <Button data-testid="brand-button">Brand</Button>
            </Card>
          </ThemeProvider>
        </Grid>
      </Page>
    </ThemeProvider>
  )
}
