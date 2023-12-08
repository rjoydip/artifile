import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Mocked } from 'vitest'
import * as vscode from 'vscode'
import { openTextDocument, showTextDocument, showTextDocumentNonPreview } from '../../../src/utils'

const documentName = 'simple-text-file.txt'
// const fixturesPath = join(__dirname, '..', '..', 'fixtures')

vi.mock('vscode', () => ({
  window: {
    showTextDocument: vi.fn(),
  },
  workspace: {
    openTextDocument: vi.fn(),
  },
}))

// Provide types for the mocked functions
const mockedVscode = vscode as Mocked<typeof vscode>

describe('utils > vscode > document', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('openTextDocument', async () => {
    await openTextDocument(documentName)
    expect(mockedVscode.workspace.openTextDocument).toHaveBeenCalledWith(documentName)
  })

  it('showTextDocument', async () => {
    const document: any = {} // Replace with a mock TextDocument if needed
    await showTextDocument(document)
    expect(mockedVscode.window.showTextDocument).toHaveBeenCalledWith(document, {})
  })

  it('showTextDocumentNonPreview', async () => {
    const document: any = {} // Replace with a mock TextDocument if needed
    await showTextDocumentNonPreview(document)
    expect(mockedVscode.window.showTextDocument).toHaveBeenCalledWith(document, { preview: false })
  })
})
