import { Uri } from 'vscode'
import type { WorkspaceFolder } from 'vscode'
import { closeAllOpenedFiles, getFiles, getWorkspaceFolders, openFileInEditor } from './utils'
import { blankFilePrompt, config, isAnyDocumentOpenedInEditor, isWorkspaceEmpty, readActiveFile, showInfoMessage } from './utils/vscode'
import type { ArtifileConfig } from './types'

export async function start() {
  showInfoMessage('Artifile - automation started')
  await startAutomation()
}

export async function pause() {
  showInfoMessage('Artifile - automation paused')
}

export async function stop() {
  showInfoMessage('Artifile - automation stopped')
}

async function getFilesForAutomation(options?: {
  workspaceFolders?: WorkspaceFolder[]
  config?: ArtifileConfig
}) {
  let files: Set<string> = new Set()
  const $workspaceFolders = options?.workspaceFolders || getWorkspaceFolders()
  const dir = $workspaceFolders ? Uri.file($workspaceFolders[0].uri.fsPath).fsPath : null
  if (dir) {
    files = await getFiles({
      dir,
      config,
    })
    return files
  }
  return files
}

async function startAutomation() {
  if (isAnyDocumentOpenedInEditor)
    await closeAllOpenedFiles()

  if (!isWorkspaceEmpty())
    await blankFilePrompt()

  const files = await getFilesForAutomation()
  if (!files.size)
    return

  await Promise.all([...[...files].map(async (file: string) => {
    await openFileInEditor(file)
    await readActiveFile()
  })])
}
