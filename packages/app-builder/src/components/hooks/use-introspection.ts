import { useQuery, gql } from '@apollo/client'
import {
  getIntrospectionQuery,
  IntrospectionQuery,
  IntrospectionObjectType,
  IntrospectionOutputTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionListTypeRef,
  IntrospectionField,
} from 'graphql'

const OBJECT = 'OBJECT'
const NON_NULL = 'NON_NULL'
const LIST = 'LIST'

const isIntrospectionObjectType = (type: any): type is IntrospectionObjectType => {
  return type.kind === OBJECT
}

const isNonNullType = (type: IntrospectionOutputTypeRef): type is IntrospectionNonNullTypeRef<any> => {
  return type.kind === NON_NULL
}

const isListType = (type: IntrospectionOutputTypeRef): type is IntrospectionListTypeRef<any> => {
  return type.kind === LIST
}

const flatKind = (type: IntrospectionOutputTypeRef, kinds: Array<string> = []): Array<string> => {
  if (isNonNullType(type) || isListType(type)) {
    return [...kinds, type.kind, ...flatKind(type.ofType, kinds)]
  }

  return [...kinds, type.kind]
}

const getObjectType = (type: IntrospectionOutputTypeRef): string => {
  if (isNonNullType(type) || isListType(type)) {
    return getObjectType(type.ofType)
  }

  return type.name
}

const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
  return value !== null && value !== undefined
}

type NestedDict = {
  [key: string]: NestedDict | undefined
}

const nestedFieldsToString = (nestedFields?: NestedDict) => {
  if (!nestedFields) {
    return ''
  }

  const str = Object.entries(nestedFields)
    .map(([fieldName, field]) => [fieldName, nestedFieldsToString(field)])
    .flat()
    .join(' ')

  return `{ ${str} }`
}

const queryableFieldToNestedDict = (
  type: IntrospectionOutputTypeRef,
  queryableObjectTypes: IntrospectionObjectType[],
): NestedDict | undefined => {
  const nestedDict: NestedDict = {}

  if (type.kind === NON_NULL || type.kind === LIST) {
    return queryableFieldToNestedDict(type.ofType, queryableObjectTypes)
  }

  if (type.kind === 'SCALAR') {
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

type QueryableField = IntrospectionField & {
  nestedKinds: Array<string>
  nestedType: string
}

const parseIntrospection = (introspection: IntrospectionQuery) => {
  if (!introspection) {
    return null
  }
  const schema = introspection.__schema
  const queryName = schema.queryType.name
  const mutationName = schema.mutationType?.name

  const objectTypes = schema.types.filter(isIntrospectionObjectType)

  const queryType: Array<QueryableField> =
    objectTypes
      .find((type) => type.name === queryName)
      ?.fields.map((field) => ({
        ...field,
        nestedKinds: flatKind(field.type),
        nestedType: getObjectType(field.type),
      })) || []

  const queryableObjectTypes = Array.from(new Set(queryType.map((type) => type.nestedType)))
    .map((objectName) => objectTypes.find(({ name }) => name === objectName))
    .filter(notEmpty)

  const mutationType: Array<QueryableField> =
    objectTypes
      .find((type) => type.name === mutationName)
      ?.fields.map((field) => ({
        ...field,
        nestedKinds: flatKind(field.type),
        nestedType: getObjectType(field.type),
      })) || []

  return queryableObjectTypes.map((object) => {
    const queries = queryType.filter(({ nestedType }) => object.name === nestedType)

    const list = queries.find(({ nestedKinds }) => nestedKinds.includes(LIST))

    const listND = list && queryableFieldToNestedDict(list.type, queryableObjectTypes)
    const listTypeStr = listND && nestedFieldsToString(listND)
    const listQuery = list && `${queryName} { ${list.name}${listTypeStr ? ` ${listTypeStr}` : ''} }`

    return {
      object,
      list: listQuery,
      // TODO: check if below are correct
      create: mutationType.find(({ args }) => args.length === 1 && args[0].name === object.name),
      update: mutationType.find(({ args }) => args.length === 2 && args[0].name === object.name),
      delete: mutationType.find(({ args }) => args.length === 1 && args[0].name === 'id'),
    }
  })
}

export const useIntrospection = () => {
  const introspectionQuery = gql`
    ${getIntrospectionQuery()}
  `
  const { loading, data, error } = useQuery(introspectionQuery)
  const parsedIntrospection = parseIntrospection(data)
  console.log(parsedIntrospection)
  return {
    loading,
    error,
    data: data as IntrospectionQuery | undefined,
  }
}
