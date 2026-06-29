// Responsive Styles docs — mobile-first array syntax.
import styled from '@emotion/styled'
import {
  space,
  layout,
  typography,
  type SpaceProps,
  type LayoutProps,
  type TypographyProps,
} from '@soroush.tech/styled-system'
import { type AppTheme } from './theme'

type BoxProps = SpaceProps<AppTheme> & LayoutProps<AppTheme> & TypographyProps<AppTheme>

const Box = styled('div')<BoxProps>(space, layout, typography)

export function Responsive() {
  // Array syntax: [base, ≥sm, ≥md, …], mapped to `theme.breakpoints`.
  // (styled-system also supports an object syntax with breakpoint *aliases* when
  // `theme.breakpoints` is an array carrying named properties, e.g. `breakpoints.sm`.)
  return <Box width={[1, 1 / 2, 1 / 4]} fontSize={[1, 2, 3, 4]} m={[1, 2, 3]} />
}
