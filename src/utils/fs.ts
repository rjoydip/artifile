import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'fs-extra'
import { totalist } from 'totalist'
import { anyOf, createRegExp } from 'magic-regexp'
import textExtensions from 'text-extensions'

export const fileExtRegex = createRegExp('.', anyOf(...textExtensions))

export interface GetFileType {
  dir?: string
  ignores?: string[]
}

export async function getFiles(ops: GetFileType = {
  dir: '',
  ignores: [],
}) {
  const files: Set<string> = new Set()

  if (ops.dir) {
    await totalist(ops.dir, (name: string, abs: string) => {
      if (ops.ignores?.length) {
        if (!createRegExp(anyOf(...ops.ignores)).test(abs)) {
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

export interface GitIgnoreFilesProps {
  dir?: string
  excludes?: string[]
  gitignore?: boolean
}

export async function getGitIgnoreItems(ops: GitIgnoreFilesProps = {
  dir: '',
  excludes: [],
  gitignore: false,
}) {
  if (!ops.dir)
    return []
  if (!ops.gitignore)
    return []

  const gitignoreFilePath = join(ops.dir, '.gitignore')

  if (existsSync(gitignoreFilePath)) {
    const gitignoreContent = await readFile(join(ops.dir, '.gitignore'))
    const ignores = gitignoreContent.toString().split('\r\n').filter(i => !!i)
    if (ops.gitignore && ops.excludes)
      return [...ops.excludes, ...ignores]

    return ignores
  }
  else {
    return []
  }
}
