// Custom Style Props docs — build your own style functions with `system`, read
// `.propNames`, and combine functions with `compose`.
import styled from '@emotion/styled'
import {
  system,
  compose,
  space,
  layout,
  color,
  type SpaceProps,
  type LayoutProps,
  type ColorProps,
} from '@soroush.tech/styled-system'
import { type AppTheme } from './theme'

// `system` creates a style-prop function. Each key is a CSS prop config:
// `true` = same-named CSS property; an object = { property, scale, transform, … }.
const typeSet = system({
  textDecoration: true,
  fontWeight: { property: 'fontWeight', scale: 'fontWeights' },
})

const Link = styled('a')<{ textDecoration?: string; fontWeight?: string | number }>(typeSet)

// Every parser exposes `.propNames` — the props it consumes.
export const typeSetPropNames: string[] = typeSet.propNames

// `compose` merges multiple style functions into one.
type BoxProps = SpaceProps<AppTheme> & LayoutProps<AppTheme> & ColorProps<AppTheme>
const Box = styled('div')<BoxProps>(compose(space, layout, color))

export function CustomProps() {
  return (
    <>
      <Link textDecoration="underline" fontWeight="bold">
        Link
      </Link>
      <Box m={2} width={1 / 2} color="primary" />
    </>
  )
}
