import type { ExtensionContext } from 'vscode'
import { version } from '../package.json'
import { RegisterCommands } from './commands'
import { Log } from './utils'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🈶 Activated, v${version}`)

  RegisterCommands(ctx)
}

export function deactivate() {
  Log.info('🈚 Deactivated')
}
