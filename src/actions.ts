import { Uri } from 'vscode'
import type { WorkspaceFolder } from 'vscode'
import { pForever } from './extrn'
import { closeAllOpenedFiles, getFiles, getWorkspaceFolders, navigateFiles, showFilesInEditor } from './utils'
import { blankFilePrompt, config, isAnyDocumentOpenedInEditor, isWorkspaceEmpty, readActiveDocumentByMoveCursor } from './utils/vscode'
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
  await showFilesInEditor(files)
  const maxLimit = config?.navigation?.maxLimit ?? Number.POSITIVE_INFINITY
  await pForever(async (index) => {
    index++
    if (index > maxLimit)
      return pForever.end

    await navigateFiles(index - 1, files.size, [...files], config?.navigation?.timeout)
    readActiveDocumentByMoveCursor()
    return index
  }, 0)
}

export async function start() {
  if (isAnyDocumentOpenedInEditor)
    await closeAllOpenedFiles()

  if (isWorkspaceEmpty()) {
    const files = await getFilesForAutomation()
    if (files.size) {
      await startAutomation(config, files)
    }
    else {
      await blankFilePrompt()
      const files = await getFilesForAutomation()
      await startAutomation(config, files)
    }
  }
  else {
    await blankFilePrompt()
    const files = await getFilesForAutomation()
    await startAutomation(config, files)
  }
}

export async function pause() {
}

export async function stop() {
}
