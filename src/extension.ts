import type { ExtensionContext } from 'vscode'
import { version } from '../package.json'
import { registerCommands } from './commands'
import { Log } from './utils'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🈶 Activated, v${version}`)
  registerCommands(ctx)
}

export function deactivate() {
  Log.info('🈚 Deactivated')
}
