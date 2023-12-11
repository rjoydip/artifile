import { window } from 'vscode'

export function showErrorMessage(msg: string) {
  return window.showErrorMessage(msg)
}

export function showInfoMessage(msg: string) {
  return window.showInformationMessage(msg)
}
