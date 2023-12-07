import type { Mocked } from 'vitest'
import { describe, expect, it, vi } from 'vitest'

import * as vscode from 'vscode'
import { activate, deactivate } from '../src/extension'
import { registerCommands } from '../src/commands'

vi.mock('vscode', async () => {
  const actual = async () => await vi.importActual('vscode')
  return {
    ...actual,
    window: {
      createOutputChannel: vi.fn(() => ({
        appendLine: vi.fn(),
      })),
    },
    commands: {
      registerCommand: vi.fn(),
    },
    ExtensionContext: {
      subscriptions: [],
      workspaceState: {
        get: vi.fn(),
        update: vi.fn(),
      },
    },
  }
})

const mockedVscode = vscode as Mocked<typeof vscode>

describe('extension', () => {
  it('activate', async () => {
    const mock = vi.spyOn(vscode.commands, 'registerCommand')
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    await activate(mockedVscode.ExtensionContext)
    expect(mock).toHaveBeenCalledTimes(3)
  })

  it('deactivate', async () => {
    deactivate()
  })
})
