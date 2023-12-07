import type { TextDocument } from 'vscode'
import { window, workspace } from 'vscode'

export function openTextDocument(file: string) {
  return workspace.openTextDocument(file)
}

export function showTextDocument(document: TextDocument) {
  return window.showTextDocument(document)
}

export function showTextDocumentNonPreview(document: TextDocument) {
  return window.showTextDocument(document, { preview: false })
}
