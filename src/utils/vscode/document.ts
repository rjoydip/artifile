import { window, workspace } from 'vscode'
import type { TextDocument, TextDocumentShowOptions } from 'vscode'
import { Log } from './log'

export function openTextDocument(file: string) {
  return workspace.openTextDocument(file)
}

export const isAnyDocumentOpenedInEditor = !!getOpenedDocument()

export function getOpenedDocument(): TextDocument | null {
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

export function readDocumentByCursor(document: TextDocument) {
  const lineCount = document.lineCount

  for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
    const line = document.lineAt(lineNumber)
    const lineText = line.text

    Log.info(lineText)
  }
}
