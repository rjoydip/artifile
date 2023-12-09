import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Mocked } from 'vitest'
import * as vscode from 'vscode'
import { getWorkspaceFSpath, getWorkspaceFolders, getWorkspaceTextDocuments, isWorkspaceEmpty } from '../../../src/utils'

vi.mock('vscode', () => {
  const actual = async () => await vi.importActual('vscode')
  return {
    ...actual,
    workspace: {
      textDocuments: [],
      workspaceFolders: [],
    },
    window: {
      activeTextEditor: {
        document: {},
      },
    },
  }
})

const mockedVscode = vscode as Mocked<typeof vscode>

describe('utils > vscode > workspace', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('getWorkspaceTextDocuments', () => {
    const result = getWorkspaceTextDocuments()
    expect(result).toEqual([])
  })

  it('getWorkspaceFolders', () => {
    const result = getWorkspaceFolders()
    expect(result).toEqual([])
  })

  it('isWorkspaceEmpty', () => {
    const result = isWorkspaceEmpty()
    expect(result).toBe(true) // Assuming an empty workspace initially
  })

  it('getWorkspaceFSpath', () => {
    mockedVscode.workspace.workspaceFolders?.push(
      {
        uri: {
          fsPath: '/path/to/workspace',
          scheme: '',
          authority: '',
          path: '',
          query: '',
          fragment: '',
          with(_: { scheme?: string | undefined, authority?: string | undefined, path?: string | undefined, query?: string | undefined, fragment?: string | undefined }): vscode.Uri {
            throw new Error('Function not implemented.')
          },
          toJSON() {
            throw new Error('Function not implemented.')
          },
        },
        name: 'WorkspaceName',
        index: 0,
      },
    )
    const result = getWorkspaceFSpath()
    expect(result).toBe('/path/to/workspace')
  })
})
