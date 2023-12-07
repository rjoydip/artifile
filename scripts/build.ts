import { execSync } from 'node:child_process'
import { copy, readJSON, remove, writeJSON } from 'fs-extra'

async function build() {
  await remove('./dist')
  execSync('tsup src/extension.ts --format cjs --external vscode --no-shims', { stdio: 'inherit' })

  const files = [
    'LICENSE',
    'README.md',
    '.vscodeignore',
    'res',
  ]

  for (const f of files)
    await copy(`./${f}`, `./dist/${f}`)

  const json = await readJSON('./package.json')
  delete json.scripts
  delete json.devDependencies
  json.main = 'extension.js'
  await writeJSON('./dist/package.json', json)
}

build()
