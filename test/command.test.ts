import { describe, expect, it } from 'vitest'
import { getCommands } from '../src/command'

describe('command', () => {
  it('should valid command', async () => {
    const commands = await getCommands()
    expect(commands.StartAutomate).toStrictEqual('artifile.startAutomate')
    expect(commands.StopAutomate).toStrictEqual('artifile.stopAutomate')
  })
})
