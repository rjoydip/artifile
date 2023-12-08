import { join } from 'node:path'
import { existsSync, readFile } from 'fs-extra'
import { totalist } from 'totalist'
import { anyOf, createRegExp } from 'magic-regexp'
import textExtensions from 'text-extensions'
import type { GetFileType, GitIgnoreFilesProps } from '../types'

export const fileExtRegex = createRegExp('.', anyOf(...textExtensions))

export async function getFiles(ops: GetFileType = {
  dir: '',
  config: {
    gitignore: false,
    excludes: [],
  },
}) {
  const files: Set<string> = new Set()
  if (ops.dir) {
    await totalist(ops.dir, async (name: string, abs: string) => {
      let ignores = ops?.config?.gitignore
        ? await getGitIgnoreItems({
          dir: ops.dir,
        })
        : ops.config?.excludes || []
      ignores = ignores.filter(i => i)
      if (ignores?.length) {
        if (!createRegExp(anyOf(...ignores)).test(abs)) {
          if (fileExtRegex.test(name))
            files.add(abs)
        }
      }
      else {
        if (fileExtRegex.test(name))
          files.add(abs)
      }
    })
  }
  return files
}

export async function getGitIgnoreItems(ops: GitIgnoreFilesProps = {
  dir: '',
}) {
  if (!ops.dir)
    return []

  const gitignoreFilePath = join(ops.dir, '.gitignore')

  if (existsSync(gitignoreFilePath)) {
    const gitignoreContent = await readFile(join(ops.dir, '.gitignore'))
    return gitignoreContent.toString().split('\r\n').filter(i => !!i)
  }
  else {
    return []
  }
}
