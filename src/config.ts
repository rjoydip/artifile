import { workspace } from 'vscode'

interface IConfig {}

export function getConfiguration(extension = 'artifile'): IConfig {
  return workspace.getConfiguration().get(extension) || {}
}
