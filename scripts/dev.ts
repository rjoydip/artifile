import { execSync } from 'node:child_process'
import { remove } from 'fs-extra'

async function dev() {
  await remove('./dist')
  execSync('tsup src/index.ts --format cjs --external vscode --no-shims --watch', { stdio: 'inherit' })
}

dev()
