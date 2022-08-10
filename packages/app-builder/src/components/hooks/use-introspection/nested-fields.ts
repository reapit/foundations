import { IntrospectionOutputTypeRef, IntrospectionObjectType, TypeKind } from 'graphql'
import { flatKind, getObjectType } from './helpers'
import { isNonNullType, QueryableField } from './types'

type NestedDict = {
  [key: string]: NestedDict | undefined
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

  if (type.kind === TypeKind.NON_NULL || type.kind === TypeKind.LIST) {
    return queryableFieldToNestedDict(type.ofType, queryableObjectTypes)
  }

  if (type.kind === TypeKind.SCALAR || type.kind === TypeKind.ENUM) {
    return undefined
  }

  if (type.kind === TypeKind.OBJECT) {
    const objectType = queryableObjectTypes.find(({ name }) => name === type.name)
    if (objectType) {
      objectType.fields.forEach((field) => {
        if (field.name !== 'placeholder') {
          nestedDict[field.name] = queryableFieldToNestedDict(field.type, queryableObjectTypes)
        }
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
      isRequired: isNonNullType(field.type),
    })) || []
