// The subpath exports: css, theme-get, props, should-forward-prop.
import { css } from '@soroush.tech/styled-system/css'
import { themeGet } from '@soroush.tech/styled-system/theme-get'
import { pick, omit } from '@soroush.tech/styled-system/props'
import shouldForwardProp, {
  createShouldForwardProp,
  props,
} from '@soroush.tech/styled-system/should-forward-prop'
import { theme } from './theme'

// css() resolves a theme-aware style object (shorthands, scales, responsive, pseudos)
// into a plain CSS-in-JS object — pass it the theme (or props.theme).
export const styleObject = css({
  color: 'primary',
  p: 4,
  borderRadius: 'md',
  fontSize: [2, 3, 4],
  '&:hover': { bg: 'secondary' },
})(theme)

// themeGet reads a single value from the theme by dot-path, with a fallback.
export const primary = themeGet('colors.primary', '#0077cc')({ theme })

// pick / omit split a props bag by whether each key is a known style prop.
export const styleOnly = pick({ m: 2, color: 'primary', onClick: () => {} })
export const htmlOnly = omit({ m: 2, color: 'primary', onClick: () => {} })

// should-forward-prop: the default predicate, plus a custom allowlist.
export const forwardOnClick: boolean = shouldForwardProp('onClick')
export const forwardMargin: boolean = shouldForwardProp('m')
export const customShouldForward = createShouldForwardProp([...props, 'variant'])
