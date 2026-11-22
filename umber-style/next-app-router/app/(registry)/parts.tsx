'use client'

import { Card, Heading, Muted, Nav, NavLink } from '../../components'
import { styled } from '../../style'

// The parts of the registry pages are client components: a server component cannot see the
// CacheProvider (the server build has no context), so only what a client component renders reaches the
// registry.

export function Header({ title }: { title: string }) {
  return (
    <>
      <Nav>
        <NavLink href="/">Server components</NavLink>
        <NavLink href="/registry">Registry</NavLink>
        <NavLink href="/registry/stream">Registry, streamed</NavLink>
      </Nav>
      <Heading>{title}</Heading>
    </>
  )
}

export function AtOnce() {
  return (
    <Card data-testid="registry-card">
      <Muted>Rendered at once: its rules are in the first flush of the registry.</Muted>
    </Card>
  )
}

export function Waiting() {
  return <Muted data-testid="registry-fallback">Loading the late part...</Muted>
}

/**
 * A class that no part of the first flush has, and a token (`radii[1]`) that no earlier rule used: the
 * late chunk brings the class and a new `:root` rule that declares that token.
 */
const Late = styled('aside', { name: 'Late' })(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.primary}`,
  borderRadius: theme.radii[1],
  paddingLeft: theme.space[3],
}))

export function LatePart() {
  return (
    <Card data-testid="registry-late">
      <Late>Streamed in about 1.5 s later, through Suspense, with its own style element.</Late>
    </Card>
  )
}
