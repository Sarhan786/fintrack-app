import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 5173,
    open: true,
    // 👇 Critical: enable SPA fallback
    fs: {
      allow: ['.'],
    },
    middlewareMode: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 👇 Add this
  build: {
    outDir: 'dist',
  },
  // 👇 This is the important bit for React Router
  preview: {
    port: 5173,
    open: true,
  },
})
