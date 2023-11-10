// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  stylistic: true,
  typescript: true,
  markdown: true,
  jsonc: true,
}, {
  ignores: ['**/fixtures'],
})
