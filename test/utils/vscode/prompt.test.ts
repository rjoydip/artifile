import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Mocked } from 'vitest'
import * as vscode from 'vscode'
import { blankFilePrompt } from '../../../src/utils'

vi.mock('vscode', () => ({
  window: {
    showInputBox: vi.fn(),
    showErrorMessage: vi.fn(),
  },
}))

const mockedVscode = vscode as Mocked<typeof vscode>

describe('utils > vscode > prompt', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('blankFilePrompt with empty file', async () => {
    const spy = vi.spyOn(vscode.window, 'showInputBox')
    await blankFilePrompt()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({ prompt: 'Do you want with empty file?', value: 'Yes' })
  })

  it('when empty file - yes', async () => {
    const spy = vi.spyOn(vscode.window, 'showInputBox')
    mockedVscode.window.showInputBox({
      prompt: 'Do you want with empty file?',
      value: 'Yes',
    })
    await blankFilePrompt()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('when empty file - no', async () => {
    const spy = vi.spyOn(vscode.window, 'showInputBox')
    const spyError = vi.spyOn(vscode.window, 'showErrorMessage')
    mockedVscode.window.showInputBox({
      prompt: 'Do you want with empty file?',
      value: 'No',
    })
    await blankFilePrompt()
    expect(spy).toHaveBeenCalledTimes(2) // TODO: 2 shouldn't be it would 1 - something here
    expect(spyError).toHaveBeenCalledTimes(1)
  })

  it('when create file - yes', async () => {
    const spy = vi.spyOn(vscode.window, 'showInputBox')

    mockedVscode.window.showInputBox({
      prompt: 'Do you want create a file?',
      value: 'Yes',
    })

    await blankFilePrompt()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('when create file - No', async () => {
    const spy = vi.spyOn(vscode.window, 'showInputBox')
    mockedVscode.window.showInputBox({
      prompt: 'Do you want create a file?',
      value: 'No',
    })

    await blankFilePrompt()
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
