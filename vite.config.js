import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // iso-hub-webgl (three) is an on-demand chunk.
    chunkSizeWarningLimit: 1800,
  },
})
