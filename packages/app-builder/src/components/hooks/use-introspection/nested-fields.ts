import { IntrospectionOutputTypeRef, IntrospectionObjectType } from 'graphql'
import { flatKind, getObjectType } from './helpers'
import { LIST, NON_NULL, OBJECT, QueryableField, SCALAR } from './types'

type NestedDict = {
  [key: string]?: NestedDict
}

export const nestedFieldsToString = (nestedFields?: NestedDict) => {
  if (!nestedFields) {
    return ''
  }

  const str = Object.entries(nestedFields)
    .map(([fieldName, field]) => [fieldName, nestedFieldsToString(field)])
    .flat()
    .join(' ')

  return `{ ${str} }`
}

export const queryableFieldToNestedDict = (
  type: IntrospectionOutputTypeRef,
  queryableObjectTypes: IntrospectionObjectType[],
): NestedDict | undefined => {
  const nestedDict: NestedDict = {}

  if (type.kind === NON_NULL || type.kind === LIST) {
    return queryableFieldToNestedDict(type.ofType, queryableObjectTypes)
  }

  if (type.kind === SCALAR) {
    return undefined
  }

  if (type.kind === OBJECT) {
    const objectType = queryableObjectTypes.find(({ name }) => name === type.name)
    if (objectType) {
      objectType.fields.forEach((field) => {
        nestedDict[field.name] = queryableFieldToNestedDict(field.type, queryableObjectTypes)
      })
    }
  }

  return nestedDict
}

export const getTopLevelFields = (
  objectTypes: Array<IntrospectionObjectType>,
  queryName: string,
): Array<QueryableField> =>
  objectTypes
    .find((type) => type.name === queryName)
    ?.fields.map((field) => ({
      ...field,
      nestedKinds: flatKind(field.type),
      nestedType: getObjectType(field.type),
    })) || []
