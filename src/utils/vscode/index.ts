import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { Uri, commands, window, workspace } from 'vscode'
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

export function getWorkspaceFSpath() {
  let _path = ''
  const workspaceFolders = getWorkspaceFolders()
  if (workspaceFolders)
    _path = workspaceFolders[0].uri.fsPath.toString()

  return _path
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

export async function createBlankFile(fileName: string = 'blank.txt', path: string = '', fileContent: string = '') {
  const _path = join(getWorkspaceFSpath(), path)
  const uri = _path ? Uri.file(`${_path}/${fileName}`) : Uri.file(fileName)
  const content = Buffer.from(fileContent, 'utf8')
  return await workspace.fs.writeFile(uri, content)
}

export async function openBlankFile(fileContent: string = '') {
  const document = await workspace.openTextDocument({ content: fileContent })
  return await window.showTextDocument(document)
}

export async function navigateFile(count: number = 0, numOfFiles: number = 0, files: string[], timeout: number = 0) {
  const nextIndex = (numOfFiles + count) % (numOfFiles)
  await setTimeout(timeout)
  const document = await openTextDocument(files[nextIndex])
  return await showTextDocumentNonPreview(document)
}

export * from './prompt'
