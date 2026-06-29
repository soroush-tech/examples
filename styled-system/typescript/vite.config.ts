import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// @vitejs/plugin-react enables the Emotion JSX runtime + Fast Refresh.
export default defineConfig({
  plugins: [react()],
})
