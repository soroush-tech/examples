import { styled } from './style'

// No directive: a server component that imports these renders them with the server build, a client
// component with the client build. The source is the same.

export const Page = styled('main', { name: 'Page' })(({ theme }) => ({
  maxWidth: 640,
  margin: '0 auto',
  padding: theme.space[4],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[3],
}))

export const Nav = styled('nav', { name: 'Nav' })(({ theme }) => ({
  display: 'flex',
  gap: theme.space[3],
}))

export const NavLink = styled('a', { name: 'NavLink' })(({ theme }) => ({
  color: theme.palette.primary,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}))

export const Heading = styled('h1', { name: 'Heading' })({ margin: 0, fontSize: 28 })

export const Muted = styled('p', { name: 'Muted' })(({ theme }) => ({
  margin: 0,
  color: theme.palette.muted,
}))

export const Card = styled('section', { name: 'Card' })(({ theme }) => ({
  backgroundColor: theme.palette.surface,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.radii[2],
  padding: theme.space[3],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[2],
}))

export const Button = styled('button', { name: 'Button' })(({ theme }) => ({
  alignSelf: 'flex-start',
  backgroundColor: theme.palette.primary,
  color: theme.palette.onPrimary,
  border: 'none',
  borderRadius: theme.radii[3],
  padding: `${theme.space[2]} ${theme.space[3]}`,
  font: 'inherit',
  cursor: 'pointer',
  '&:hover': { opacity: 0.85 },
}))
