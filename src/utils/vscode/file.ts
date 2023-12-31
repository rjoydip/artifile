import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import { Uri, commands, workspace } from 'vscode'
import { existsSync, mkdirSync, writeFile } from 'fs-extra'
import { openTextDocument, showTextDocument, showTextDocumentNonPreview } from './document'
import { getWorkspaceFSpath, getWorkspaceTextDocuments } from './workspace'

export async function closeAllOpenedFiles() {
  const allTextDocuments = getWorkspaceTextDocuments()
  return (await Promise.allSettled(allTextDocuments)).map(async () => {
    await commands.executeCommand('workbench.action.closeActiveEditor')
  })
}

export async function createBlankFile(fileName: string = 'Artifile.txt', $path: string = '', fileContent: string = '') {
  const workspacePath = getWorkspaceFSpath()
  const _path = ($path === workspacePath || $path.startsWith(workspacePath)) ? $path : join(getWorkspaceFSpath(), $path)
  if (!existsSync(_path))
    mkdirSync(_path)
  const uri = _path ? Uri.file(`${_path}/${fileName}`) : Uri.file(fileName)
  const content = Buffer.from(fileContent, 'utf8')
  return await writeFile(uri.fsPath, content)
}

export async function openBlankFile(fileContent: string = '') {
  const document = await workspace.openTextDocument({ content: fileContent })
  return await showTextDocument(document)
}

export async function openFileInEditor(file: string) {
  const document = await openTextDocument(file)
  return await showTextDocumentNonPreview(document)
}
