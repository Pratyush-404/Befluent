import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'chrome-ext/content.ts'),
      output: {
        dir: resolve(__dirname, 'chrome-ext/dist'),
        entryFileNames: 'bundle.js',
        format: 'iife',
        name: 'ContentScript',
      },
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './src/setupTests.ts',
  // },
})
