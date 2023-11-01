import { Uri, commands, window, workspace } from 'vscode'

import { getFiles } from './utils'
import { getCommands } from './command'

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
      // TODO: open untitled file and put some content automatically
    }
  }
  else {
    window.showErrorMessage('Working folder not found, open a folder an try again')
  }
  window.showInformationMessage('Start Automate')
}

export async function activate() {
  const commands$ = await getCommands()
  commands.registerCommand(commands$.StartAutomate, startAutomate)
}

export function deactivate() { }
