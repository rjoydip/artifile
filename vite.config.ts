/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: ['**/src/**', '**/node_modules/**'],
  },
  base: './src/',
})
