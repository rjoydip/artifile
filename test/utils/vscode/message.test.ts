import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Mocked } from 'vitest'
import * as vscode from 'vscode'
import { showErrorMessage } from '../../../src/utils'

vi.mock('vscode', () => ({
  window: {
    showErrorMessage: vi.fn(),
  },
}))

// Provide types for the mocked functions
const mockedVscode = vscode as Mocked<typeof vscode>

describe('utils > vscode > document', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('showErrorMessage', async () => {
    await showErrorMessage('hello')
    expect(mockedVscode.window.showErrorMessage).toHaveBeenCalledWith('hello')
  })
})
