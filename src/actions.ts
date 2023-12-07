import { Uri } from 'vscode'
import type { WorkspaceFolder } from 'vscode'
import { pForever } from './extrn'
import { closeAllOpenedFiles, getFiles, getWorkspaceFolders, navigateFileAsync, showFilesInEditorAsync } from './utils'
import { blankFilePrompt, config, isWorkspaceEmpty } from './utils/vscode'
import type { ArtifileConfig } from './types'

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

async function startAutomation(config: ArtifileConfig, files: Set<string>) {
  const maxLimit = config?.navigation?.timeout ?? Number.POSITIVE_INFINITY
  await pForever(async (index) => {
    index++
    if (index > maxLimit)
      return pForever.end

    await navigateFileAsync(index - 1, files.size, [...files], maxLimit)
    return index
  }, 0)
}

export async function start() {
  await closeAllOpenedFiles()
  if (isWorkspaceEmpty()) {
    const files = await getFilesForAutomation()
    if (files.size) {
      await showFilesInEditorAsync(files)
      await startAutomation(config, files)
    }
    else { await blankFilePrompt() }
  }
  else {
    await blankFilePrompt()
  }
}

export async function pause() {
}

export async function stop() {
}
