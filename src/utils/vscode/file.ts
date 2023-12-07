import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { Uri, commands, window, workspace } from 'vscode'
import { openTextDocument, showTextDocumentNonPreview } from './document'
import { getWorkspaceFSpath, getWorkspaceTextDocuments } from './workspace'

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

export async function createBlankFile(fileName: string = 'Artifile.txt', path: string = '', fileContent: string = '') {
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
