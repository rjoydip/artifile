import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/extension.ts', 'scripts/{build,dev}.ts'],
  project: ['src/**/*.ts', 'scripts/**/*.ts'],
  ignore: ['src/**/**/log.ts'],
  ignoreBinaries: ['changelogithub'],
  ignoreDependencies: ['@antfu/eslint-config', 'tsup'],
}

export default config
