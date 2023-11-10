import { setTimeout } from 'node:timers/promises'
import { commands, window, workspace } from 'vscode'
import type { TextDocument } from 'vscode'

export function openTextDocument(file: string) {
  return workspace.openTextDocument(file)
}

export function showErrorMessage(msg: string) {
  return window.showErrorMessage(msg)
}

export function showInfoMessage(msg: string) {
  return window.showInformationMessage(msg)
}

export function getWorkspaceTextDocuments() {
  return workspace.textDocuments
}

export function getActiveTextEditor() {
  return window.activeTextEditor
}

export function getWorkspaceFolders() {
  return workspace.workspaceFolders
}

export function getTotalNumberOfOpenedFiles() {
  const len = getWorkspaceTextDocuments().length
  return len === 0 ? len : len - 1
}

export async function closeAllOpenedFiles() {
  const allTextDocuments = getWorkspaceTextDocuments()

  return (await Promise.allSettled(allTextDocuments)).map(async () => {
    await commands.executeCommand('workbench.action.closeActiveEditor')
  })
}

export function showTextDocument(document: TextDocument) {
  return window.showTextDocument(document)
}

export function showTextDocumentNonPreview(document: TextDocument) {
  return window.showTextDocument(document, { preview: false })
}