/// <reference types="vitest" />

import { defineConfig } from 'vite'
import VitePluginPackageAddMissingField from './plugins/vite-plugin-package-add-missing-field'

export default defineConfig({
  test: {
    exclude: ['**/src/**', '**/node_modules/**'],
  },
  base: './src/',
  plugins: [VitePluginPackageAddMissingField([{
    packageName: 'vscode',
    field: {
      main: 'lib/shared.js',
    },
  }])],
})
