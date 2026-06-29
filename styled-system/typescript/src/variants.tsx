// Variants docs — inline variants, custom prop name, themeable (scale) variants,
// and the built-in buttonStyle / textStyle / colorStyle.
import styled from '@emotion/styled'
import { variant, buttonStyle, textStyle, colorStyle } from '@soroush.tech/styled-system'

// Inline variants (the v5 API, powered by css()).
const Button = styled('button')<{ variant?: 'primary' | 'secondary' }>(
  { appearance: 'none', fontFamily: 'inherit' },
  variant({
    variants: {
      primary: { color: 'white', bg: 'primary' },
      secondary: { color: 'white', bg: 'secondary' },
    },
  })
)

// Custom prop name via `prop`.
const Text = styled('div')<{ size?: 'big' | 'small' }>(
  variant({
    prop: 'size',
    variants: {
      big: { fontSize: 4, lineHeight: 'heading' },
      small: { fontSize: 1, lineHeight: 'body' },
    },
  })
)

// Themeable variants via `scale` (reads theme.buttons).
const ThemedButton = styled('button')<{ variant?: 'primary' | 'secondary' }>(
  variant({
    scale: 'buttons',
    variants: { primary: {}, secondary: {} },
  })
)

// Built-in variants — props: `variant`/`textStyle`/`colors`, keys: buttons/textStyles/colorStyles.
const LegacyButton = styled('button')<{ variant?: string }>(buttonStyle)
const Heading = styled('h2')<{ textStyle?: string }>(textStyle)
const Swatch = styled('div')<{ colors?: string }>(colorStyle)

export function Variants() {
  return (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Text size="big">Big</Text>
      <ThemedButton variant="primary">Themed</ThemedButton>
      <LegacyButton variant="primary">Legacy</LegacyButton>
      <Heading textStyle="heading">Heading</Heading>
      <Swatch colors="muted" />
    </>
  )
}
