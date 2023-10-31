import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { fileExtRegex, getFiles } from '../../src/utils'

vi.mock('vscode', () => {
  return {
    default: { myDefaultKey: vi.fn() },
    namedExport: vi.fn(),
    window: {
      createOutputChannel: () => {
        return {
          appendLine: vi.fn(),
        }
      },
    },
  }
})

describe('utils', () => {
  it('should valid file extension', () => {
    expect(fileExtRegex.test('index.ts')).toEqual(true)
    expect(fileExtRegex.test('index.ps')).toEqual(false)
  })

  it('should valid get files', async () => {
    const files = await getFiles(join(__dirname, '..', 'fixtures'))
    expect(files.size).toEqual(2)
    expect(files).toEqual(new Set(['1.txt', 'index.json'].map(file => join(__dirname, '..', 'fixtures', file))))
  })
})
