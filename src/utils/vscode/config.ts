import { computed, reactive, ref } from '@vue/reactivity'
import { workspace } from 'vscode'
import { contributes } from '../../../package.json'
import { EXT_NAMESPACE } from '../../meta'
import { getProperty } from '../obj'
import type { ArtifileConfig } from '../../types'

const _configState = ref(0)

export function getDefautConfigPropsValue<T>(ops: {
  basePath?: string
  path?: string
  defaultValue?: T
}) {
  const propsBasePath = ops.basePath ?? 'configuration.properties'
  return ops.path ? getProperty(contributes, `${propsBasePath}.${ops.path?.replace('.', '\\.')}`, ops.defaultValue) : getProperty(contributes, propsBasePath, ops.defaultValue)
}

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

const config: ArtifileConfig = reactive({
  gitignore: createConfigRef(`${EXT_NAMESPACE}.gitignore`, getDefautConfigPropsValue({
    path: `${EXT_NAMESPACE}.gitignore.default`,
    defaultValue: true,
  })),
  excludes: createConfigRef(`${EXT_NAMESPACE}.excludes`, getDefautConfigPropsValue({
    path: `${EXT_NAMESPACE}.excludes.items.enum`,
    defaultValue: [],
  })),
  navigation: {
    timeout: createConfigRef(`${EXT_NAMESPACE}.navigation.timeout`, getDefautConfigPropsValue({
      path: `${EXT_NAMESPACE}.navigation.timeout.default`,
      defaultValue: 2000,
    })),
    maxLimit: createConfigRef(`${EXT_NAMESPACE}.navigation.maxLimit`, getDefautConfigPropsValue({
      path: `${EXT_NAMESPACE}.navigation.maxLimit.default`,
      defaultValue: 100,
    })),
  },
})

export default config
export { config }
