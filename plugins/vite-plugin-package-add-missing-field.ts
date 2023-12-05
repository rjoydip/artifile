import { join } from 'node:path'
import { cwd } from 'node:process'
import { readFile, writeFile } from 'node:fs/promises'
import _debug from 'debug'
import type { Plugin } from 'vite'

const debug = _debug('vite-plugin-package-add-missing-field')

export interface Options {
  /**
   * @default ''
   */
  packagePath?: string
  /**
   * @default ''
   */
  packageName?: string
  /**
   * Define field in package.json (if field missing) for npm / internal package
   *
   * @default 'main'
   */
  field: { [index: string]: string }
  /**
   * @default true
   */
  isNPM?: boolean
}

export interface VitePluginPackageAddMissingFieldPlugin extends Plugin {
  api: {
    options: Options
  }
}

function isEmpty(str: string) {
  return str === ''
}

function VitePluginPackageAddMissingField(
  options: Options[],
): VitePluginPackageAddMissingFieldPlugin[] {
  return options.map((opts) => {
    let { packagePath = '', packageName = '', field = {}, isNPM = true } = opts

    if (isEmpty(packagePath) && isEmpty(packageName))
      packagePath = cwd()

    if (isEmpty(packagePath) && !isEmpty(packageName)) {
      if (isNPM) {
        packagePath = join(
          cwd(),
          'node_modules',
          packageName,
        )
      }
      else {
        packagePath = join(
          cwd(),
          packageName,
        )
      }
    }

    return {
      name: 'vite-plugin-package-main',
      async config() {
        debug('loading package.json at %s', packagePath)

        try {
          const filePath = new URL(packagePath, import.meta.url)
          const packageJson = await readFile(filePath)
          const packageJsonData = JSON.parse(packageJson.toString())
          await Promise.all([...Object.keys(field).map(async (f: string) => {
            const fieldValue = packageJsonData[f]
            if (fieldValue) {
              debug('%s field already exists in package.json - skip', f)
              return
            }
            if (!fieldValue) {
              debug('%s field not found in package.json - add', f)
              await writeFile(packagePath, Object.assign({}, packageJsonData, { [f]: field[f] }))
            }
          })])
        }
        catch (e) {
          debug('parse error: %o', e)
          debug('error on loading package.json at %s, skip', packagePath)
        }
      },
      api: {
        options: {
          packagePath,
          packageName,
          field,
          isNPM,
        },
      },
    }
  })
}

export default VitePluginPackageAddMissingField
