import { join, sep } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fileExtRegex, getFiles, getGitIgnoreItems } from '../../src/utils'

const fixturesPath = join(__dirname, '..', 'fixtures')
const filesShouldBeExpected = ['.gitignore', `node_modules${sep}foo.js`, `empty-gitignore${sep}.gitignore`, 'simple-text-file.txt', 'ruby.rb', 'package.json', 'typescript.ts']

vi.mock('vscode', () => {
  const actual = async () => await vi.importActual('vscode')
  return {
    ...actual,
    window: {
      activeTextEditor: {},
    },
  }
})

describe('utils > fs', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should valid file extension', () => {
    expect(fileExtRegex.test('index.ts')).toEqual(true)
    expect(fileExtRegex.test('index.ps')).toEqual(false)
  })

  describe('should validate "getFiles" methods', () => {
    it('should valid files', async () => {
      const files = await getFiles({
        dir: fixturesPath,
      })
      expect(files.size).toStrictEqual(7)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file))))
    })

    it('should valid files when excludes is empty', async () => {
      const files = await getFiles({
        dir: fixturesPath,
        config: {
          excludes: ['.gitignore'],
        },
      })
      expect(files.size).toStrictEqual(5)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file)).filter(f => !f.includes('.gitignore'))))
    })

    it('should valid files when excludes is not empty', async () => {
      const files = await getFiles({
        dir: fixturesPath,
        config: {
          excludes: ['.gitignore'],
        },
      })
      expect(files.size).toStrictEqual(5)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file)).filter(f => !f.includes('.gitignore'))))
    })

    it('should valid files when gitignore is false', async () => {
      const files = await getFiles({
        dir: fixturesPath,
        config: {
          gitignore: false,
        },
      })
      expect(files.size).toStrictEqual(7)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file))))
    })

    it('should valid files when gitignore is true', async () => {
      const files = await getFiles({
        dir: fixturesPath,
        config: {
          gitignore: true,
        },
      })
      // Length is same of filesShouldBeExpected length because in the
      // `fixtures` directory `.gitignore` doesn't have anything to ignored
      expect(files.size).toStrictEqual(7)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file))))
    })
  })

  describe('should validate "getGitIgnoreItems" methods', () => {
    it('should valid if .gitignore files present and not empty', async () => {
      const files = await getGitIgnoreItems({
        dir: fixturesPath,
      })
      expect(files.length).toEqual(1)
    })

    it('should valid if .gitignore files present but empty', async () => {
      const files = await getGitIgnoreItems({
        dir: join(fixturesPath, 'empty-gitignore'),
      })
      expect(files.length).toEqual(0)
    })

    it('should valid if .gitignore files not present', async () => {
      const files = await getGitIgnoreItems({
        dir: join(fixturesPath, 'empty-dir'),
      })
      expect(files.length).toEqual(0)
    })
  })
})
