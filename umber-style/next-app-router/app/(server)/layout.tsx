import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import { darkTheme, lightTheme } from '../../theme'
import { base, Global, ThemeProvider, themeClass } from '../../style'
import { readScheme, SCHEME_COOKIE } from './scheme'

export const metadata = { title: 'UmberStyle - server components', icons: { icon: 'data:,' } }

// Asking for a theme class makes its rule; the root provider below sends the rule of its theme.
const classes = { light: themeClass(lightTheme, 'light'), dark: themeClass(darkTheme, 'dark') }

// A server component, so `ThemeProvider` and `Global` are the server build. The choice is a cookie, read
// here: the first HTML already has the class of the stored theme on <html>, so there is nothing to fix
// before the first paint and no script.
export default async function ServerLayout({ children }: { children: ReactNode }) {
  const scheme = readScheme((await cookies()).get(SCHEME_COOKIE)?.value)
  return (
    <html lang="en" className={classes[scheme]}>
      <body>
        <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme} colorScheme={scheme} isRoot>
          <Global styles={base} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
