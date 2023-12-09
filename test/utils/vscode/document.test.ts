import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Mocked } from 'vitest'
import * as vscode from 'vscode'
import { openTextDocument, showTextDocument, showTextDocumentNonPreview } from '../../../src/utils'

const documentName = 'simple-text-file.txt'

vi.mock('vscode', () => {
  const actual = async () => await vi.importActual('vscode')
  return {
    ...actual,
    window: {
      showTextDocument: vi.fn(),
    },
    workspace: {
      openTextDocument: vi.fn(),
    },
  }
})

const mockedVscode = vscode as Mocked<typeof vscode>

describe('utils > vscode > document', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should validate open text document', async () => {
    await openTextDocument(documentName)
    expect(mockedVscode.workspace.openTextDocument).toHaveBeenCalledWith(documentName)
  })

  it('should validate show text document', async () => {
    const document: any = {}
    await showTextDocument(document)
    expect(mockedVscode.window.showTextDocument).toHaveBeenCalledWith(document, {})
  })

  it('should validate show text document in non-preview', async () => {
    const document: any = {}
    await showTextDocumentNonPreview(document)
    expect(mockedVscode.window.showTextDocument).toHaveBeenCalledWith(document, { preview: false })
  })
})
