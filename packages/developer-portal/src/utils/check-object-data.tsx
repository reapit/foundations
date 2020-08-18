export type CheckObjectFieldsParams<T> = {
  object: T
  keys: (keyof T)[]
}

export const checkAtLeastOneKeyHasValueIsNotEmpty = <T,>({ object, keys }: CheckObjectFieldsParams<T>) => {
  if (!object) {
    return false
  }

  return keys.some(key => {
    if ((object[key] as any) === 0) {
      return true
    }

    return Boolean(object[key])
  })
}

export const checkAllKeysHasValueNotEmpty = <T,>({ object, keys }: CheckObjectFieldsParams<T>) => {
  if (!object) {
    return false
  }

  return keys.every(key => {
    if ((object[key] as any) === 0) {
      return true
    }

    return Boolean(object[key])
  })
}
