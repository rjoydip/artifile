import { Uri } from 'vscode'
import { pForever } from './extrn'
import { Log, closeAllOpenedFiles, getFiles, getGitIgnoreItems, getWorkspaceFolders, navigateFile, openTextDocument, prompt, showTextDocumentNonPreview } from './utils'
import { config } from './utils/vscode'

export async function start() {
  Log.info(`Configs: ${JSON.stringify(config)}`)
  await closeAllOpenedFiles()
  const workspaceFolders = getWorkspaceFolders()
  if (workspaceFolders) {
    const dir = Uri.file(workspaceFolders[0].uri.fsPath).fsPath
    const ignores = config.gitignore
      ? await getGitIgnoreItems({
        dir,
      })
      : config.excludes
    Log.info(`${JSON.stringify(ignores)}`)
    const files = await getFiles({
      dir,
      ignores,
    })
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
