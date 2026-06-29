// Every style function from the API docs, composed onto one Emotion component and
// driven by theme-scale-aware, typed props.
import styled from '@emotion/styled'
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  compose,
  type SpaceProps,
  type ColorProps,
  type TypographyProps,
  type LayoutProps,
  type FlexboxProps,
  type GridProps,
  type BackgroundProps,
  type BorderProps,
  type PositionProps,
  type ShadowProps,
} from '@soroush.tech/styled-system'
import { type AppTheme } from './theme'

type BoxProps = SpaceProps<AppTheme> &
  ColorProps<AppTheme> &
  TypographyProps<AppTheme> &
  LayoutProps<AppTheme> &
  FlexboxProps<AppTheme> &
  GridProps<AppTheme> &
  BackgroundProps<AppTheme> &
  BorderProps<AppTheme> &
  PositionProps<AppTheme> &
  ShadowProps<AppTheme>

const Box = styled('div')<BoxProps>(
  compose(space, color, typography, layout, flexbox, grid, background, border, position, shadow)
)

export function StyleFunctions() {
  return (
    <Box
      // space
      m={3}
      p={[2, 3, 4]}
      // color
      color="primary"
      bg="white"
      // typography (fontSize/fontWeight/lineHeight are scale-aware)
      fontSize={4}
      fontWeight="bold"
      lineHeight="body"
      fontFamily="body"
      textAlign="center"
      // layout
      width={[1, 1 / 2]}
      maxWidth="container"
      display="flex"
      overflow="hidden"
      // flexbox
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      // grid
      gridGap={2}
      gridTemplateColumns="repeat(3, 1fr)"
      // background
      backgroundImage="url(banner.png)"
      backgroundSize="cover"
      // border (borderColor → colors, borderRadius → radii)
      border="1px solid"
      borderColor="primary"
      borderRadius="md"
      // position
      position="relative"
      top={0}
      zIndex={1}
      // shadow
      boxShadow="card"
    >
      All style functions
    </Box>
  )
}
