import { useState } from 'react'
import { Box, hostElements, Label, Press } from './host'
import { Global, StyleSheet, styled, themeClass, ThemeProvider, useStyle } from './style'
import { brandTheme, darkTheme, lightTheme } from './theme'

// One source for the web and for iOS and Android. Nothing here names a platform: the elements come
// from ./host, the styles from umber-style/react.

const Screen = styled(Box, { name: 'Screen' })(({ theme }) => ({
  flexGrow: 1,
  gap: theme.space[3],
  padding: theme.space[4],
  backgroundColor: theme.palette.background,
  web: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, sans-serif',
  },
}))

const Card = styled(Box, { name: 'Card' })(({ theme }) => ({
  gap: theme.space[2],
  padding: theme.space[3],
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.border,
  borderRadius: theme.radii[2],
  backgroundColor: theme.palette.surface,
  web: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  native: { alignItems: 'flex-start' },
}))

const Text = styled(Label, { name: 'Text' })(({ theme }) => ({
  color: theme.palette.text,
  fontSize: 16,
}))

const Button = styled(Press, { name: 'Button' })(({ theme }) => ({
  paddingTop: theme.space[2],
  paddingBottom: theme.space[2],
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  borderRadius: theme.radii[3],
  backgroundColor: theme.palette.primary,
  web: { border: 'none', cursor: 'pointer', fontFamily: 'inherit', '&:hover': { opacity: 0.85 } },
}))

const ButtonLabel = styled(Label, { name: 'ButtonLabel' })(({ theme }) => ({
  color: theme.palette.onPrimary,
  fontSize: 16,
  fontWeight: 'bold',
}))

// A sheet: its entries are given to a styled component through `style`, on both platforms.
const sheet = StyleSheet.create((theme) => ({
  title: { fontSize: 24, fontWeight: 'bold' },
  note: { fontSize: 13, color: theme.palette.muted },
}))

const page = { body: { margin: 0 } }

/** What the binding itself answers: a class string on the web, nothing on React Native. */
function BindingProbe() {
  const styles = useStyle(sheet)
  const lightClass = themeClass(lightTheme)
  const binding = lightClass === '' ? 'the React Native binding' : 'the React binding (web)'
  const entry: unknown = styles.note
  const shape =
    typeof entry === 'object' && entry !== null && 'className' in entry
      ? `a class, "${String(entry)}"`
      : `a style object, ${JSON.stringify(entry)}`
  return (
    <Card>
      <Text style={styles.title}>Which binding?</Text>
      <Text>{`umber-style/react resolved to ${binding}.`}</Text>
      <Text style={styles.note}>{`themeClass(lightTheme) gave "${lightClass}".`}</Text>
      <Text style={styles.note}>{`A sheet entry is ${shape}.`}</Text>
      <Text style={styles.note}>{`The elements are ${hostElements}.`}</Text>
    </Card>
  )
}

export default function App() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light')
  const styles = useStyle(sheet)
  const next = scheme === 'light' ? 'dark' : 'light'
  return (
    <ThemeProvider theme={scheme === 'light' ? lightTheme : darkTheme} colorScheme={scheme}>
      <Global styles={page} />
      <Screen>
        <Text style={styles.title}>One source, two platforms</Text>
        <Card>
          <Text>{`The page is in the ${scheme} theme.`}</Text>
          <Button onPress={() => setScheme(next)}>
            <ButtonLabel>{`Switch to ${next}`}</ButtonLabel>
          </Button>
        </Card>
        <ThemeProvider theme={brandTheme}>
          <Card>
            <Text>A nested theme: this card has a surface, text and button of its own.</Text>
            <Button onPress={() => setScheme(next)}>
              <ButtonLabel>{`Switch to ${next}`}</ButtonLabel>
            </Button>
          </Card>
        </ThemeProvider>
        <BindingProbe />
      </Screen>
    </ThemeProvider>
  )
}
