import type { ReactNode } from 'react'
import Providers from './providers'

export const metadata = { title: 'UmberStyle - registry', icons: { icon: 'data:,' } }

// A root layout of its own: a server component with no theme class on <html>. The outermost provider in
// the providers file declares its theme on `:root`.
export default function RegistryLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
