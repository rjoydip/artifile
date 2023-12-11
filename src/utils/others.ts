import { setTimeout } from 'node:timers/promises'

export const delay = async (ms?: number, value?: string) => await setTimeout(ms, value)
