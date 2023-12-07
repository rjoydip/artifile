export interface ArtifileConfig {
  gitignore?: boolean
  excludes?: Array<string>
  navigation?: {
    timeout?: number
    maxLimit?: number
  }
}

export interface GitIgnoreFilesProps {
  dir?: string
}

export interface GetFileType {
  config?: ArtifileConfig
  dir?: string
}
