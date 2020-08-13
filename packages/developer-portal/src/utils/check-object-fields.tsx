export type CheckObjectFieldsParams<T> = {
  object: T
  keys: (keyof T)[]
}

export const checkAtLeastOneKeysOfObjectIsNotEmpty = <T,>({ object, keys }: CheckObjectFieldsParams<T>) => {
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

/**
 * return false if object fields's value contain falsy value
 * warning: this consider 0 as truthy value
 */
export const checkObjectKeysValueIsNotEmpty = <T,>({ object, keys }: CheckObjectFieldsParams<T>) => {
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
