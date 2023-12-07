import { workspace } from 'vscode'

export function getWorkspaceTextDocuments() {
  return workspace.textDocuments
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
