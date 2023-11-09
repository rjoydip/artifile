import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: [
      'src/extension.ts',
    ],
    format: ['cjs'],
    minify: !options.watch,
    shims: !!options.watch,
    dts: !!options.watch,
    clean: true,
    external: [
      'vscode',
    ],
  }
})
