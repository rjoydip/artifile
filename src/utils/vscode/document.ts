import { window, workspace } from 'vscode'
import type { TextDocument, TextDocumentShowOptions } from 'vscode'

export function openTextDocument(file: string) {
  return workspace.openTextDocument(file)
}

export function showTextDocument(document: TextDocument, ops: TextDocumentShowOptions = {}) {
  return window.showTextDocument(document, ops)
}

export function showTextDocumentNonPreview(document: TextDocument) {
  return showTextDocument(document, { preview: false })
}
