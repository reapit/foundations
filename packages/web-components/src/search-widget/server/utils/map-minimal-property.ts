import pickBy from 'lodash.pickby'

/**
 * Map through to return only necessary properties
 */
export const mapMinimalProperty = <T extends {}, R extends Partial<T>>(
  property: T,
  includedEmbeddedProps: string[],
): R => {
  return pickBy(property, (_, key) => includedEmbeddedProps.includes(key)) as R
}
