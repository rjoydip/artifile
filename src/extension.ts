import { Uri, commands, window, workspace } from 'vscode'

import { Command, getFiles } from './utils'

function openFileInVscode(file: Uri) {
  workspace.openTextDocument(file).then(document => window.showTextDocument(document, { preview: false }))
}

function initAutomate(filepath: string) {
  const file = Uri.file(filepath)
  openFileInVscode(file)
}

async function startAutomate() {
  if (workspace.workspaceFolders !== undefined) {
    const path = workspace.workspaceFolders[0].uri.fsPath
    const files = await getFiles(path)
    if (files.size) {
      for (const file of files)
        initAutomate(file)
    }
    else {
      window.showErrorMessage('Working folder not found, open a folder an try again')
    }
  }
  else {
    window.showErrorMessage('Working folder not found, open a folder an try again')
  }
  window.showInformationMessage('Start Automate')
}

export async function activate() {
  commands.registerCommand(Command.StartAutomate, startAutomate)
}

export function deactivate() { }
