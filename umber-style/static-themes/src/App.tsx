import { useEffect, useState, type ReactNode } from 'react'
import { forestTheme, lightTheme, oceanTheme, sandTheme, sunsetTheme } from './theme'
import {
  Global,
  globalStyles,
  isThemeName,
  STORAGE_KEY,
  styled,
  StyleSheet,
  themeClass,
  themeClasses,
  ThemeProvider,
  useStyle,
  type ThemeName,
} from './style'

const base = globalStyles((theme) => ({
  body: {
    margin: 0,
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
    fontFamily: 'system-ui, sans-serif',
    lineHeight: 1.5,
  },
}))

const Page = styled('main', { name: 'Page' })(({ theme }) => ({
  maxWidth: 760,
  margin: '0 auto',
  padding: theme.space[4],
  display: 'grid',
  gap: theme.space[4],
}))

const Section = styled('section', { name: 'Section' })(({ theme }) => ({
  display: 'grid',
  gap: theme.space[3],
  padding: theme.space[3],
  backgroundColor: theme.palette.surface,
  color: theme.palette.text,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.radii[2],
}))

const Row = styled('div', { name: 'Row' })(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.space[2],
}))

const Title = styled('h2', { name: 'Title' })({ margin: 0, fontSize: 18 })

const Muted = styled('p', { name: 'Muted' })(({ theme }) => ({ margin: 0, color: theme.palette.muted }))

const Button = styled('button', { name: 'Button' })(({ theme }) => ({
  font: 'inherit',
  cursor: 'pointer',
  border: 0,
  borderRadius: theme.radii[2],
  padding: `${theme.space[2]} ${theme.space[3]}`,
  backgroundColor: theme.palette.primary,
  color: theme.palette.onPrimary,
  '&:hover': { opacity: 0.85 },
  '&[aria-pressed="true"]': { outline: `2px solid ${theme.palette.text}`, outlineOffset: 2 },
}))

// Overrides live in a later cascade layer than the component's own rules, so they win.
const overrides = StyleSheet.create((theme) => ({
  danger: {
    backgroundColor: theme.palette.danger,
    color: theme.palette.onDanger,
    borderRadius: theme.radii[0],
  },
}))

function readStored(): ThemeName | null {
  try {
    const name = localStorage.getItem(STORAGE_KEY)
    return isThemeName(name) ? name : null
  } catch {
    return null
  }
}

function ThemeSwitch() {
  // `null` until mounted: the prerendered HTML cannot know what this browser stored.
  const [current, setCurrent] = useState<string | null>(null)
  const [sunsetClass, setSunsetClass] = useState<string | null>(null)

  useEffect(() => setCurrent(readStored() ?? 'light'), [])

  const choose = (name: ThemeName) => {
    document.documentElement.className = themeClasses[name]
    setCurrent(name)
    try {
      localStorage.setItem(STORAGE_KEY, name)
    } catch {
      // A browser that refuses storage still switches; it only forgets on reload.
    }
  }

  const addSunset = () => {
    // The rule of a theme class is made when it is asked for: no build and no render of a component.
    const name = sunsetClass ?? themeClass(sunsetTheme, 'dark')
    setSunsetClass(name)
    document.documentElement.className = name
    setCurrent('sunset')
  }

  return (
    <Row>
      {(Object.keys(themeClasses) as ThemeName[]).map((name) => (
        <Button key={name} data-theme={name} aria-pressed={current === name} onClick={() => choose(name)}>
          {name}
        </Button>
      ))}
      <Button data-theme="sunset" aria-pressed={current === 'sunset'} onClick={addSunset}>
        {sunsetClass ? 'sunset' : 'add a fourth theme'}
      </Button>
    </Row>
  )
}

function Overrides() {
  const styles = useStyle(overrides)
  return (
    <Row>
      <Button data-testid="plain-button">Save</Button>
      <Button data-testid="danger-button" style={styles.danger}>
        Delete
      </Button>
    </Row>
  )
}

function Nested({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <Section data-testid={`section-${name}`}>
      <Row>
        <Title>{name}</Title>
        <Button>{name} button</Button>
      </Row>
      {children}
    </Section>
  )
}

export function App() {
  return (
    // isRoot: the theme of the page is the class on <html>, which the head script and the buttons set.
    <ThemeProvider theme={lightTheme} colorScheme="light" isRoot>
      <Global styles={base} />
      <Page>
        <Section>
          <Title>Theme of the page</Title>
          <Muted>A class on html. The choice is stored and applied before the first paint.</Muted>
          <ThemeSwitch />
        </Section>
        <Section>
          <Title>Override through style</Title>
          <Muted>The second button is the same component, given a sheet entry in its style prop.</Muted>
          <Overrides />
        </Section>
        <ThemeProvider theme={sandTheme}>
          <Nested name="sand">
            <ThemeProvider theme={oceanTheme}>
              <Nested name="ocean">
                <ThemeProvider theme={forestTheme}>
                  <Nested name="forest" />
                </ThemeProvider>
              </Nested>
            </ThemeProvider>
          </Nested>
        </ThemeProvider>
      </Page>
    </ThemeProvider>
  )
}
