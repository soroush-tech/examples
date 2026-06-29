import styled from '@emotion/styled'
import {
  space,
  color,
  typography,
  type SpaceProps,
  type ColorProps,
  type TypographyProps,
} from '@soroush.tech/styled-system'
import { type AppTheme } from './theme'
import { StyleFunctions } from './style-functions'
import { Responsive } from './responsive'
import { Variants } from './variants'
import { CustomProps } from './custom-props'

// Theme-scale-aware props. `m`/`p` resolve to `space` indices, `color`/`bg` to `colors`
// keys, `fontSize` to `fontSizes` indices. An off-scale value is a compile error.
type BoxProps = SpaceProps<AppTheme> & ColorProps<AppTheme> & TypographyProps<AppTheme>

// Style functions slot straight into Emotion's `styled()` — no `any`, no adapter.
const Box = styled('div')<BoxProps>(space, color, typography)

export function App() {
  return (
    <Box bg="primary" color="white" fontSize={4}>
      <Box m={3} p={[2, 4]}>
        Typed styled-system + Emotion
        <StyleFunctions />
        <Responsive />
        <Variants />
        <CustomProps />
      </Box>
    </Box>
  )
}
