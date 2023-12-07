import { describe, expect, it } from 'vitest'
import { getProperty } from '../../src/utils'

describe('utils > object', () => {
  it('should valid object by accesssing dot notation', () => {
    const object = { foo: { bar: 1 } }
    expect(getProperty(object, 'foo.bar')).toBe(1)
    expect(getProperty(object, 'foo.bar_', 2)).toBe(2)
  })
})
