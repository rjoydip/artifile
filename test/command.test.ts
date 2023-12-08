import type * as vscode from 'vscode'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { registerCommands } from '../src/commands'

class MockExtensionContext implements vscode.ExtensionContext {
  subscriptions: { dispose(): any }[] = []
  workspaceState!: vscode.Memento
  globalState!: vscode.Memento & { setKeysForSync(keys: readonly string[]): void }
  extensionUri: any = vi.fn()
  extensionPath!: string
  asAbsolutePath(_relativePath: string): string {
    throw new Error('Method not implemented.')
  }

  storageUri: vscode.Uri | undefined
  storagePath: string | undefined
  globalStorageUri: any = vi.fn()
  globalStoragePath!: string
  logUri: any = vi.fn()
  logPath!: string
  extension!: vscode.Extension<any>
}

vi.mock('vscode', () => {
  const actual = async () => await vi.importActual('vscode')
  return {
    ...actual,
    window: {
      activeTextEditor: {},
    },
    commands: {
      registerCommand: vi.fn(),
    },
  }
})

describe('command', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('should validate register commands', () => {
    it('should valid number of commands registered', () => {
      const mockCtx = new MockExtensionContext()
      expect(registerCommands(mockCtx).subscriptions.length).toBe(3)
    })
  })
})
