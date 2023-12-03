import { Uri } from 'vscode'
import { pForever } from './extrn'
import { Log, closeAllOpenedFiles, getWorkspaceFolders, navigateFile, openTextDocument, prompt, showTextDocumentNonPreview } from './utils'
import { getFiles } from './utils/fs'
import { config } from './config'

export async function start() {
  Log.info(`Configs: ${JSON.stringify(config)}`)
  await closeAllOpenedFiles()
  const workspaceFolders = getWorkspaceFolders()
  if (workspaceFolders) {
    const dir = Uri.file(workspaceFolders[0].uri.fsPath).fsPath
    const files = await getFiles(dir)
    if (files.size) {
      const showDocPromises = [...files].map(async (file: string) => {
        const document = await openTextDocument(file)
        return await showTextDocumentNonPreview(document)
      })
      await Promise.allSettled(showDocPromises)
      await pForever(async (index) => {
        index++
        if (index > config.navigation.maxLimit)
          return pForever.end

        await navigateFile(index - 1, files.size, [...files], config.navigation.timeout)
        return index
      }, 0)
    }
    else {
      await prompt.blankFile()
    }
  }
  else {
    await prompt.blankFile()
  }
}

export async function pause() {
}

export async function stop() {
}
