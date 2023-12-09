import { afterEach, describe, expect, it, vi } from 'vitest'
import { getProperty } from '../../src/utils'

vi.mock('vscode', () => {
  const actual = async () => await vi.importActual('vscode')
  return {
    ...actual,
    window: {
      activeTextEditor: {},
    },
  }
})

describe('utils > object', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should valid object by accesssing dot notation', () => {
    const object = { foo: { bar: 1 } }
    expect(getProperty(object, 'foo.bar')).toBe(1)
    expect(getProperty(object, 'foo.bar_', 2)).toBe(2)
  })
})
