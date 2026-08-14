import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // iso-hub-webgl (three) + glass-agency-hero (shaders/js) are on-demand chunks.
    chunkSizeWarningLimit: 1800,
  },
})
