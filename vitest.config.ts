/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './src',
  test: {
    exclude: ['**/src/**', '**/node_modules/**'],
  },
})
