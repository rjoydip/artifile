import { describe, expect, it } from 'vitest'
import { EXT_DISPLAY_NAME, EXT_ID, EXT_NAME, EXT_NAMESPACE } from '../src/meta'

describe('meta', () => {
  it('should validate all valid meta values', () => {
    expect(EXT_NAMESPACE).toStrictEqual('artifile')
    expect(EXT_ID).toStrictEqual('rjoydip.artifile')
    expect(EXT_NAME).toStrictEqual('Artifile')
    expect(EXT_DISPLAY_NAME).toStrictEqual('Artifile - A VSCode automation extension')
  })
})
