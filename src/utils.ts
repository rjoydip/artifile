import { totalist } from 'totalist'
import { anyOf, createRegExp } from 'magic-regexp'
import textExtensions from 'text-extensions'

export const fileExtRegex = createRegExp('.', anyOf(...textExtensions))
export const folderIgnoreRegexp = createRegExp(anyOf('node_modules', 'cache', 'dist'))

export async function getFiles(dir: string) {
  const files: Set<string> = new Set()

  await totalist(dir, (name: string, abs: string) => {
    if (!folderIgnoreRegexp.test(abs)) {
      if (fileExtRegex.test(name))
        files.add(abs)
    }
  })

  return files
}
