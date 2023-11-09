import { setTimeout } from 'node:timers/promises'
import { Uri, commands, window, workspace } from 'vscode'

import { getFiles } from './utils'

export function getTotalNumberOfOpenedFiles() {
  const len = workspace.textDocuments.length
  return len === 0 ? len : len - 1
}

export async function closeAllOpenedFiles() {
  const allTextDocuments = workspace.textDocuments
  for (const _ of allTextDocuments)
    await commands.executeCommand('workbench.action.closeActiveEditor')
}

function navigateNextFile() {
  const allTextDocuments = workspace.textDocuments
  const activeTextEditor = window.activeTextEditor

  const activeTextEditorIndex = allTextDocuments.findIndex(
    textDocument => textDocument === activeTextEditor?.document,
  )

  if (activeTextEditorIndex === -1) {
    window.showTextDocument(allTextDocuments[1])
  }
  else if (activeTextEditorIndex !== -1) {
    const nextIndex = (activeTextEditorIndex + 1) % allTextDocuments.length
    const nextTextDocument = allTextDocuments[nextIndex]
    window.showTextDocument(nextTextDocument)
  }
}

async function initAutomate(filePath: string) {
  if (getTotalNumberOfOpenedFiles())
    await closeAllOpenedFiles()

  const dir = Uri.file(filePath).fsPath
  const files = await getFiles(dir)
  if (files.size) {
    await Promise.all([...files].map(async (file: string) => {
      const document = await workspace.openTextDocument(file)
      window.showTextDocument(document, { preview: false })
      return true
    }))
    for (let index = 0; index < getTotalNumberOfOpenedFiles(); index++) {
      await setTimeout(2000)
      navigateNextFile()
    }
  }
  else {
    // TODO: open untitled file and put some content automatically
    window.showErrorMessage('Working folder is empty, create a file an try again')
  }
}

export async function activate() {
  window.showInformationMessage('Automation started')
  if (workspace.workspaceFolders !== undefined) {
    const path = workspace.workspaceFolders[0].uri.fsPath
    await initAutomate(path)
  }
  else {
    window.showErrorMessage('Working folder not found, open a folder an try again')
  }
}

export async function deactivate() {
  window.showInformationMessage('Automation stopped')
}
