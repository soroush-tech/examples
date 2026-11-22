import { createEngine } from '@umber-style/core'
import { css } from '@umber-style/css'
import { darkTheme, lightTheme } from './theme'

// The engine alone: every token of the theme becomes a CSS variable, and `refs` are references to them.
const engine = createEngine(lightTheme, { prefix: 'umber' })
const { refs } = engine

// A theme class declares the variables of one theme. Asking for it makes its rule.
const themes = {
  light: engine.themeClass(lightTheme, 'light'),
  dark: engine.themeClass(darkTheme, 'dark'),
}

// Global rules read the variables too, so they follow the class on <html>.
engine.insertGlobal({
  body: {
    margin: 0,
    backgroundColor: refs.palette.background,
    color: refs.palette.text,
    fontFamily: 'system-ui, sans-serif',
    lineHeight: 1.5,
  },
})

// A class from a style object: one class for every theme, because its values are variables.
const card = engine.css({
  display: 'grid',
  gap: refs.space[3],
  maxWidth: 560,
  margin: `${refs.space[5]} auto`,
  padding: refs.space[4],
  backgroundColor: refs.palette.surface,
  border: `1px solid ${refs.palette.border}`,
  borderRadius: refs.radii[2],
})

const button = engine.css({
  font: 'inherit',
  cursor: 'pointer',
  justifySelf: 'start',
  border: 0,
  borderRadius: refs.radii[2],
  padding: `${refs.space[2]} ${refs.space[3]}`,
  backgroundColor: refs.palette.primary,
  color: refs.palette.onPrimary,
  '&:hover': { opacity: 0.8 },
})

const muted = engine.css({ margin: 0, color: refs.palette.muted })

// A class with no theme at all: @umber-style/css is the plain layer, for a style that needs no token.
const mono = css({ fontFamily: 'ui-monospace, monospace', fontSize: 14 })

const element = <K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text = '') => {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  return node
}

let current: keyof typeof themes = 'light'
const root = document.documentElement
root.className = themes[current]

const panel = element('main', card)
const title = element('h1', '', 'UmberStyle with no framework')
const reference = element('p', muted)
const value = element('code', mono)
const toggle = element('button', button)
toggle.type = 'button'
toggle.dataset.testid = 'theme-switch'

const show = () => {
  // The style holds the reference; the class on <html> decides its value.
  reference.textContent = `primary is ${refs.palette.primary}, which is now `
  value.textContent = getComputedStyle(root).getPropertyValue('--umber-palette-primary').trim()
  reference.append(value)
  toggle.textContent = current === 'light' ? 'Dark theme' : 'Light theme'
}

toggle.addEventListener('click', () => {
  current = current === 'light' ? 'dark' : 'light'
  root.className = themes[current]
  show()
})

panel.append(title, reference, toggle)
document.body.append(panel)
show()
