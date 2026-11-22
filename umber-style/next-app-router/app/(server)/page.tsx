import { cookies } from 'next/headers'
import { Button, Card, Heading, Muted, Nav, NavLink, Page } from '../../components'
import { setScheme } from './actions'
import { readScheme, SCHEME_COOKIE } from './scheme'

// Every styled element here is rendered by a server component: no 'use client', no hook. Each one sends
// its own <style href precedence> element, which React moves to the head.
export default async function ServerPage() {
  const scheme = readScheme((await cookies()).get(SCHEME_COOKIE)?.value)
  const next = scheme === 'dark' ? 'light' : 'dark'
  return (
    <Page>
      <Nav>
        <NavLink href="/">Server components</NavLink>
        <NavLink href="/registry">Registry</NavLink>
        <NavLink href="/registry/stream">Registry, streamed</NavLink>
      </Nav>
      <Heading>Server components</Heading>
      <Card data-testid="server-card">
        <Muted>Styled on the server by the server build. The theme is {scheme}.</Muted>
        <form action={setScheme}>
          <input type="hidden" name="scheme" value={next} />
          <Button type="submit" data-testid="server-switch">
            Switch to {next}
          </Button>
        </form>
      </Card>
    </Page>
  )
}
