import { Uri, window, workspace } from 'vscode'

function openFileInVscode(file: Uri) {
  workspace.openTextDocument(file).then(document => window.showTextDocument(document, { preview: false }))
}

export function initAutomate(filepath: string) {
  const file = Uri.file(filepath)
  openFileInVscode(file)
}
