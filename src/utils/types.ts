export const isTruthy = <T>(a: T | undefined): a is T => Boolean(a)
export interface ArtifileConfig {
  gitignore: boolean
  excludes: Array<string>
  navigate: {
    timeout: number
  }
}
