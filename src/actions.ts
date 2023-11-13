import { setTimeout } from 'node:timers/promises'
import { Uri } from 'vscode'
import { pForever } from './extrn'
import { Log, closeAllOpenedFiles, getWorkspaceFolders, openTextDocument, showErrorMessage, showTextDocumentNonPreview } from './utils'
import { getFiles } from './utils/fs'

async function navigateFile(count: number = 0, numOfFiles: number = 0, files: string[]) {
  const nextIndex = (numOfFiles + count) % (numOfFiles)
  await setTimeout(2000)
  Log.info(`✅ ${count}, ${numOfFiles}, ${nextIndex}`)
  const document = await openTextDocument(files[nextIndex])
  return await showTextDocumentNonPreview(document)
}

export async function start() {
  await closeAllOpenedFiles()
  const workspaceFolders = getWorkspaceFolders()
  if (workspaceFolders !== undefined) {
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
        if (index > 100)
          return pForever.end

        await navigateFile(index - 1, files.size, [...files])
        return index
      }, 0)
    }
    else {
      // TODO: open untitled file and put some content automatically
      showErrorMessage('Working folder is empty, create a file an try again')
    }
  }
  else {
    showErrorMessage('Working folder not found, open a folder an try again')
  }
}

export function pause() {
}

export function stop() {
}
