import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { App } from './App'
import { theme } from './theme'

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  )
}
