import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://robdhyman.github.io/fire-tv/ so every asset URL is prefixed.
export default defineConfig({
  base: '/fire-tv/',
  plugins: [react(), tailwindcss()],
})
