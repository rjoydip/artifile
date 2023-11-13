import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileExtRegex, getFiles } from '../../src/utils/fs'

describe('utils', () => {
  it('should valid file extension', () => {
    expect(fileExtRegex.test('index.ts')).toEqual(true)
    expect(fileExtRegex.test('index.ps')).toEqual(false)
  })

  it('should valid get files', async () => {
    const files = await getFiles(join(__dirname, '..', 'fixtures'))
    expect(files.size).toEqual(4)
    expect(files).toEqual(new Set(['simple-text-file.txt', 'ruby.rb', 'package.json', 'typescript.ts'].map(file => join(__dirname, '..', 'fixtures', file))))
  })
})
