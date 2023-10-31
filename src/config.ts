import { workspace } from 'vscode'

interface IConfig {}

export function getConfiguration(extension = 'openMultipleFiles'): IConfig {
  return workspace.getConfiguration().get(extension) || {}
}
