import { execSync } from 'node:child_process'
import fs from 'fs-extra'

async function dev() {
  await fs.remove('./dist')
  execSync('tsup src/index.ts --format esm --external vscode --no-shims --watch', { stdio: 'inherit' })
}

dev()
