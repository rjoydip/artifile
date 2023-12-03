import { afterEach, describe, expect, it, vi } from 'vitest'
import { config } from '../src/config'

vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: vi.fn(() => ({
      get: vi.fn().mockReturnValue({
        gitignore: true,
        excludes: ['node_modules', '.cache', 'dist'],
        navigate: {
          timeout: 2000,
        },
      }),
      update: vi.fn(),
    })),
    workspaceFolders: [],
  },
}))

describe('config', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('should validate workspace config', () => {
    it('should valid correct configuration values', () => {
      expect(config).toBeDefined()
    })
  })
})
