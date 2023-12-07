import { afterEach, describe, expect, it, vi } from 'vitest'
import { isReactive } from '@vue/reactivity'
import { config } from '../../../src/utils/vscode/config'

vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: vi.fn(() => ({
      get: vi.fn().mockReturnValue({
        gitignore: true,
        excludes: ['node_modules', '.cache', 'dist'],
        navigation: {
          timeout: 2000,
          maxLimit: 100,
        },
      }),
    })),
  },
}))

describe('config', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('should validate workspace config', () => {
    it('should valid correct configuration values', () => {
      const original = {
        gitignore: true,
        excludes: ['node_modules', '.cache', 'dist'],
        navigation: {
          timeout: 2000,
          maxLimit: 100,
        },
      }
      expect(config).toBeDefined()
      expect(isReactive(config)).toBe(true)
      expect(config).not.toBe(original)
      expect(Object.keys(config)).toEqual(['gitignore', 'excludes', 'navigation'])
      expect('gitignore' in config).toBe(true)
    })
  })
})
