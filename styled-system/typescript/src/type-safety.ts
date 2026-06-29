// Compile-time assertions that document — and verify — the theme-scale-aware typing.
// `tsc --noEmit` is the test: if the package's types regressed to accept off-scale
// values, the `@ts-expect-error` lines below would become "unused" and fail the build.
import { type SpaceProps, type ColorProps, type TypographyProps } from '@soroush.tech/styled-system'
import { type AppTheme } from './theme'

type Props = SpaceProps<AppTheme> & ColorProps<AppTheme> & TypographyProps<AppTheme>

// On-scale values are accepted.
export const valid: Props = {
  m: 3, // space index
  p: [2, 4], // responsive space indices
  bg: 'primary', // colors key
  color: 'white', // colors key
  fontSize: 4, // fontSizes index
}

// @ts-expect-error — 'green' is not a key of the theme's `colors` scale.
export const offScaleColor: Props = { bg: 'green' }

// @ts-expect-error — `m` resolves to a numeric `space` index, not an arbitrary string.
export const offScaleSpace: Props = { m: 'huge' }
