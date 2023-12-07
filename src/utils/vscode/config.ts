import { computed, reactive, ref } from '@vue/reactivity'
import { workspace } from 'vscode'
import { EXT_NAMESPACE } from '../../meta'
import { contributes } from '../../../package.json'
import { getProperty } from '../obj'
import type { ArtifileConfig } from '../../types'

const _configState = ref(0)
const propsBasePath = `${EXT_NAMESPACE}.configuration.properties`

function getConfig<T = any>(key: string): T | undefined {
  return workspace
    .getConfiguration()
    .get<T>(key)
}

async function setConfig(key: string, value: any, isGlobal = true) {
  return await workspace
    .getConfiguration()
    .update(key, value, isGlobal)
}

function createConfigRef<T>(key: string, defaultValue: T, isGlobal = true) {
  return computed({
    get: () => {
      // eslint-disable-next-line no-unused-expressions
      _configState.value
      return getConfig<T>(key) ?? defaultValue
    },
    set: (v) => {
      setConfig(key, v, isGlobal)
    },
  })
}

export const config: ArtifileConfig = reactive({
  gitignore: createConfigRef(`${EXT_NAMESPACE}.gitignore`, getProperty(
    contributes,
    `${propsBasePath}.gitignore.default`,
    true,
  )),
  excludes: createConfigRef(`${EXT_NAMESPACE}.excludes`, getProperty(contributes, `${propsBasePath}.excludes.items.enum`, [])),
  navigation: {
    timeout: createConfigRef(`${EXT_NAMESPACE}.navigation.timeout`, getProperty(contributes, `${propsBasePath}.navigation.timeout.default`, 2000)),
    maxLimit: createConfigRef(`${EXT_NAMESPACE}.navigation.maxLimit`, getProperty(contributes, `${propsBasePath}.navigation.maxLimit.default`, 100)),
  },
})
