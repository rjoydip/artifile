import { Range, Selection, window, workspace } from 'vscode'
import type { TextDocument, TextDocumentShowOptions, TextEditor } from 'vscode'
import { delay } from '../others'

export function openTextDocument(file: string) {
  return workspace.openTextDocument(file)
}

export const isAnyDocumentOpenedInEditor = !!getOpenedDocument()

export function showTextDocument(document: TextDocument, ops: TextDocumentShowOptions = {}) {
  return window.showTextDocument(document, ops)
}

export function showTextDocumentNonPreview(document: TextDocument) {
  return showTextDocument(document, { preview: false })
}

export async function readActiveFile() {
  const editor = window.activeTextEditor
  if (editor) {
    const lineCount = editor.document.lineCount
    return new Promise((resolve) => {
      return moveCursorRecursive(editor, resolve, lineCount, 2000)
    })
  }
  else {
    return Promise.resolve('No active text editor.')
  }
}

function getOpenedDocument(): TextDocument | null {
  const editor = window.activeTextEditor
  if (editor)
    return editor.document
  return null
}

async function moveCursorRecursive(editor: TextEditor, resolve: any, lineCount: number, timeout: number) {
  let newPosition
  const currentPosition = editor.selection.active

  // Check if we reached the end of the document
  if (currentPosition.line < lineCount - 1) {
    newPosition = currentPosition.with(currentPosition.line + 1, currentPosition.character)

    await delay(timeout)

    // Move the cursor to the new position
    editor.selection = new Selection(currentPosition, newPosition)
    editor.revealRange(new Range(currentPosition, newPosition))

    // Call the function recursively with the new position
    return moveCursorRecursive(editor, resolve, lineCount, timeout)
  }
  else {
    // We reached the end of the document, resolve the promise
    resolve({
      currentPosition,
      newPosition,
      lineCount,
    })
  }
}
