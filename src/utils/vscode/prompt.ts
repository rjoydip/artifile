import { window } from 'vscode'
import { createBlankFile, getWorkspaceFSpath, openBlankFile, showErrorMessage } from '.'

export async function blankFilePrompt() {
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
        value: 'Artifile.txt',
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
