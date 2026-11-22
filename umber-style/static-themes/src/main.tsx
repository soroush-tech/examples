import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { isThemeName, STORAGE_KEY, themeClasses } from './style'

const container = document.getElementById('root') as HTMLElement
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.firstElementChild) {
  // The built page: the markup, its CSS and the class on <html> are already there.
  hydrateRoot(container, app)
} else {
  // `npm run dev` serves index.html as it is, so the browser does what the prerender and the head script do.
  let stored: string | null = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    // No storage: the default theme.
  }
  document.documentElement.className = themeClasses[isThemeName(stored) ? stored : 'light']
  createRoot(container).render(app)
}
