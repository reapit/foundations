import pickBy from 'lodash.pickby'

/**
 * Map through to return only necessary properties
 */
export const mapMinimalProperties = <T extends { _embedded?: any[] }, R extends Partial<T>>(
  { _embedded, ...rest }: T,
  includedEmbeddedProps: string[],
): R => {
  if (!_embedded) {
    return {
      ...rest,
      _embedded,
    } as R
  }
  const pickedEmbedded = _embedded.map(obj => pickBy(obj, (value, key) => includedEmbeddedProps.includes(key)))
  return {
    ...rest,
    _embedded: pickedEmbedded,
  } as R
}
