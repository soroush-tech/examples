'use client'

import createCache from '@umber-style/cache'
import { CacheProvider } from '@umber-style/react'
import { useServerInsertedHTML } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { Button, Page } from '../../components'
import { base, Global, ThemeProvider } from '../../style'
import { darkTheme, lightTheme } from '../../theme'

// The providers file of docs/cache-and-server.md: a cache for each request, whose new rules are flushed
// into the stream with useServerInsertedHTML, then the theme and the global rules. The key is the prefix
// of the style that the components are made with (`umber`).
function useStyleRegistry() {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'umber' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name)
      return prevInsert(...args)
    }
    const flush = () => {
      const prev = inserted
      inserted = []
      return prev
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) styles += cache.inserted[name]
    return (
      <style
        key={cache.key}
        data-umber={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return cache
}

// One addition to the file of the docs: the switch, a new theme for the outermost provider. It rewrites
// the one `:root` rule; no styled component renders again.
export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const cache = useStyleRegistry()
  const [isDark, setIsDark] = useState(false)
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme} colorScheme={isDark ? 'dark' : 'light'}>
        <Global styles={base} />
        <Page>
          {children}
          <Button type="button" data-testid="registry-switch" onClick={() => setIsDark(!isDark)}>
            Switch to {isDark ? 'light' : 'dark'}
          </Button>
        </Page>
      </ThemeProvider>
    </CacheProvider>
  )
}
