import { describe, expect, it } from 'vitest'
import { Command } from '../../src/utils/command'

describe('command', () => {
  it('should valid command', () => {
    expect(Command.StartAutomate).toStrictEqual('afa.startAutomate')
    expect(Command.StopAutomate).toStrictEqual('afa.stopAutomate')
  })
})
