import { join, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { fileExtRegex, getFiles, getGitIgnoreItems } from '../../src/utils/fs'

const fixturesPath = join(__dirname, '..', 'fixtures')
const filesShouldBeExpected = ['.gitignore', `node_modules${sep}foo.js`, `empty-gitignore${sep}.gitignore`, 'simple-text-file.txt', 'ruby.rb', 'package.json', 'typescript.ts']

describe('utils > fs', () => {
  it('should valid file extension', () => {
    expect(fileExtRegex.test('index.ts')).toEqual(true)
    expect(fileExtRegex.test('index.ps')).toEqual(false)
  })

  describe('should validate getFiles() methods', () => {
    it('should valid get files', async () => {
      const files = await getFiles({
        dir: fixturesPath,
      })
      expect(files.size).toStrictEqual(7)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file))))
    })

    it('should valid get files when ignoresh is empty', async () => {
      const files = await getFiles({
        dir: fixturesPath,
        ignores: ['.gitignore'],
      })
      expect(files.size).toStrictEqual(5)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file)).filter(f => !f.includes('.gitignore'))))
    })

    it('should valid get files when ignores is not empty', async () => {
      const files = await getFiles({
        dir: fixturesPath,
        ignores: ['.gitignore'],
      })
      expect(files.size).toStrictEqual(5)
      expect(files).toStrictEqual(new Set(filesShouldBeExpected.map(file => join(fixturesPath, file)).filter(f => !f.includes('.gitignore'))))
    })
  })

  describe('should validate getGitIgnoreItems() methods', () => {
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
        dir: join(fixturesPath, 'empty'),
      })
      expect(files.length).toEqual(0)
    })
  })
})
