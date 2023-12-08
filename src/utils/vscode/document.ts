import { Range, Selection, window, workspace } from 'vscode'
import type { TextDocument, TextDocumentShowOptions } from 'vscode'

export function openTextDocument(file: string) {
  return workspace.openTextDocument(file)
}

export const isAnyDocumentOpenedInEditor = !!getOpenedDocument()

function getOpenedDocument(): TextDocument | null {
  const editor = window.activeTextEditor
  if (editor)
    return editor.document
  return null
}

export function showTextDocument(document: TextDocument, ops: TextDocumentShowOptions = {}) {
  return window.showTextDocument(document, ops)
}

export function showTextDocumentNonPreview(document: TextDocument) {
  return showTextDocument(document, { preview: false })
}

export function readActiveDocumentByMoveCursor() {
  const editor = window.activeTextEditor
  if (editor) {
    const currentPosition = editor.selection.active
    const newPosition = currentPosition.with(currentPosition.line + 1, currentPosition.character)
    editor.selection = new Selection(newPosition, newPosition)
    editor.revealRange(new Range(newPosition, newPosition))
  }
  else {
    window.showInformationMessage('No active text editor.')
  }
}
