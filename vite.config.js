import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
    }),
    svgr({
      include: "**/*.svg?react",
    })
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.GIF', '**/*.SVG'],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
})
