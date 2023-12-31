import type { ExtensionContext } from 'vscode'
import { commands } from 'vscode'
import { EXT_NAMESPACE } from './meta'
import { pause, start, stop } from './actions'

export function registerCommands(ctx: ExtensionContext): ExtensionContext {
  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.start-automate`, async () => {
      await start()
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.pause-automate`, async () => {
      await pause()
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.stop-automate`, async () => {
      await stop()
    }),
  )

  return ctx
}
