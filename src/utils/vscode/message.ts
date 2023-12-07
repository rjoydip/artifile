import { window } from 'vscode'

export function showErrorMessage(msg: string) {
  return window.showErrorMessage(msg)
}
