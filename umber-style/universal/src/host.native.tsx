import type { ReactNode } from 'react'
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native'

// The same names as host.tsx, for iOS and Android: React Native's bundler picks this file there.

export { View as Box, Text as Label }

export interface PressProps {
  onPress: () => void
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export function Press({ onPress, style, children }: PressProps) {
  return (
    <Pressable role="button" onPress={onPress} style={style}>
      {children}
    </Pressable>
  )
}

export const hostElements = 'View, Text and Pressable'

export const styleOptions = {}
