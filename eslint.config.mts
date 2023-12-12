import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  markdown: true,
  jsonc: true,
  gitignore: true,
}, {
  ignores: ['**/fixtures', '**/patches'],
})
