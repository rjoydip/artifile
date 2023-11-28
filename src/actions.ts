import { setTimeout } from 'node:timers/promises'
import { Uri, window } from 'vscode'
import { pForever } from './extrn'
import { Log, closeAllOpenedFiles, createBlankFile, getWorkspaceFSpath, getWorkspaceFolders, openBlankFile, openTextDocument, showErrorMessage, showTextDocumentNonPreview } from './utils'
import { getFiles } from './utils/fs'

async function navigateFile(count: number = 0, numOfFiles: number = 0, files: string[]) {
  const nextIndex = (numOfFiles + count) % (numOfFiles)
  await setTimeout(2000)
  Log.info(`✅ ${count}, ${numOfFiles}, ${nextIndex}`)
  const document = await openTextDocument(files[nextIndex])
  return await showTextDocumentNonPreview(document)
}

async function blankFilePrompt() {
  const confirmationPrompt = await window.showInputBox({
    prompt: 'Do you want with empty file?',
    value: 'Yes',
  })

  if (confirmationPrompt?.toLocaleLowerCase() === 'yes') {
    const createFilePprompt = await window.showInputBox({
      prompt: 'Do you want create a file?',
      value: 'Yes',
    })
    if (createFilePprompt?.toLocaleLowerCase() === 'yes') {
      const filenamePrompt = await window.showInputBox({
        prompt: 'Enter file name',
        value: 'Blank.txt',
      })
      const directoryPrompt = await window.showInputBox({
        prompt: 'Enter location',
        value: getWorkspaceFSpath(),
      })
      if (filenamePrompt) {
        if (directoryPrompt)
          await createBlankFile(filenamePrompt?.toString(), directoryPrompt?.toString())
        else
          await createBlankFile(filenamePrompt?.toString())
      }
      else { await createBlankFile() }
    }
    else {
      await openBlankFile()
    }
  }
  else {
    showErrorMessage('Working folder not found, open a folder an try again')
  }
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
      await blankFilePrompt()
    }
  }
  else {
    await blankFilePrompt()
  }
}

export async function pause() {
}

export async function stop() {
}
