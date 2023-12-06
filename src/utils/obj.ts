type ValueOf<T> = T[keyof T]

export function getProperty<T extends Record<string, any>>(
  object: T,
  path: string,
  defaultValue?: any,
): ValueOf<T> | any {
  const keys = path.split('.')

  return keys.reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc)
      return acc[key]

    return defaultValue
  }, object)
}
