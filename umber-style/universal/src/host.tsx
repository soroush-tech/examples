import type { ReactNode } from 'react'

// The elements of the web. The bundler of a phone picks host.native.tsx instead, which exports the
// same names, so the shared files never name a platform.

export const Box = 'div'
export const Label = 'span'

export interface PressProps {
  onPress: () => void
  children?: ReactNode
  className?: string
}

/** A button that takes `onPress`, as Pressable does, so the shared code has one handler name. */
export function Press({ onPress, className, children }: PressProps) {
  return (
    <button type="button" className={className} onClick={onPress}>
      {children}
    </button>
  )
}

export const hostElements = 'div, span and button'

// The prefix names classes and variables, which only the web has: React Native warns about it.
export const styleOptions = { prefix: 'umber' }
