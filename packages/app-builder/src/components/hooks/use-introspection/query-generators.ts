import {
  DocumentNode,
  IntrospectionEnumType,
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
  IntrospectionObjectType,
  TypeKind,
} from 'graphql'
import { gql } from '@apollo/client'
import { nestedFieldsToString, queryableFieldToNestedDict } from './nested-fields'
import {
  QueryableField,
  isIntrospectionInputObjectType,
  isIntrospectionScalarType,
  isNonNullInputType,
  MutationType,
  stringIsMutationType,
  isListInputType,
} from './types'
import { DesktopContext } from '@/core/desktop-integration'

export type GeneratedQuery = {
  query: DocumentNode
  args: ParsedArg[]
}
export type GeneratedMutation = {
  mutation: DocumentNode
  args: ParsedArg[]
}
export type GeneratedSpecial = GeneratedMutation & {
  name: string
}

export const getListQuery = (
  queries: Array<QueryableField>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  enums: Array<IntrospectionEnumType>,
  isSearch: boolean,
): GeneratedQuery | undefined => {
  const list = queries.find(
    ({ nestedKinds, name }) => nestedKinds.includes(TypeKind.LIST) && (name.includes('search') || !isSearch),
  )
  const listDict = list && queryableFieldToNestedDict(list.type, queryableObjectTypes)
  const listTypeStr = listDict && nestedFieldsToString(listDict)
  if (!list) {
    return undefined
  }
  const args = parseArgs(list.args, inputObjectTypes, queryableObjectTypes, enums)
  const listQuery = !args?.length
    ? `{ ${list.name}${listTypeStr ? ` ${listTypeStr}` : ''} }`
    : `query ${list.name}(${stringifyArgs(args, true)}) {
        ${list.name}(${stringifyArgs(args, false)})
          ${listTypeStr ? ` ${listTypeStr}` : ''}
      }`

  return {
    query: gql`
      ${listQuery}
    `,
    args,
  }
}

export const getGetQuery = (
  queries: Array<QueryableField>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  enums: Array<IntrospectionEnumType>,
): GeneratedQuery | undefined => {
  const list = queries.find(({ nestedKinds }) => !nestedKinds.includes(TypeKind.LIST))
  if (!list) {
    return undefined
  }
  const listDict = list && queryableFieldToNestedDict(list.type, queryableObjectTypes)
  const listTypeStr = listDict && nestedFieldsToString(listDict)
  const args = parseArgs(list.args, inputObjectTypes, queryableObjectTypes, enums)
  const listQuery =
    list &&
    `query ${list.name}(${stringifyArgs(args, true)}) {
        ${list.name}(${stringifyArgs(args, false)})
          ${listTypeStr ? ` ${listTypeStr}` : ''}
    }`
  return {
    query: gql`
      ${listQuery}
    `,
    args,
  }
}

export type ParsedArg = {
  name: string
  isRequired: boolean
  isList: boolean
  typeName: string
  idOfType?: string
  enumValues?: Array<string>
  fields?: Array<ParsedArg>
  acKey?: DesktopContext
}

const parseArgs = (
  args: Readonly<Array<IntrospectionInputValue>>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  enums: Array<IntrospectionEnumType>,
): Array<ParsedArg> => {
  return args.map((arg) => {
    const { name, description, type } = arg
    let typeName = isIntrospectionScalarType(type) ? type.name : ''
    let actualType = type
    let idOfType
    let isRequired = false
    let isList = false

    if (isNonNullInputType(type)) {
      actualType = type.ofType
      typeName = actualType.name
      isRequired = true
    }

    if (isListInputType(actualType)) {
      typeName = actualType.ofType.name
      actualType = actualType.ofType
      isList = true

      if (isNonNullInputType(actualType)) {
        actualType = actualType.ofType
        typeName = actualType.name
        isRequired = true
      }
    }

    const actualTypeObject =
      isIntrospectionInputObjectType(actualType) &&
      inputObjectTypes.find((a) => isIntrospectionInputObjectType(a) && a.name === typeName)

    if (typeName === 'ID' && name !== 'id') {
      const idName = name.replace('Id', '')
      idOfType = queryableObjectTypes.find((a) => a.name.toLowerCase() === idName)?.name
    }
    if (description && description.includes('@idOf')) {
      const idName = description.split('@idOf(')[1].split(')')[0]
      idOfType = queryableObjectTypes.find((a) => a.name.toLowerCase() === idName.toLowerCase())?.name
    }

    const acKey = description?.split('@acKey(')[1]?.split(')')[0] as DesktopContext

    const enumValues = enums.find(({ name }) => name === typeName)?.enumValues.map((e) => e.name)
    return {
      name,
      acKey,
      isRequired,
      typeName,
      idOfType,
      isList,
      enumValues,
      fields:
        (actualTypeObject &&
          isIntrospectionInputObjectType(actualTypeObject) &&
          parseArgs(actualTypeObject.inputFields, inputObjectTypes, queryableObjectTypes, enums)) ||
        undefined,
    }
  })
}

const stringifyArgs = (args: Array<ParsedArg>, isFirstLevel: boolean) => {
  return args
    .map((arg) => {
      return isFirstLevel ? `$${arg.name}: ${arg.typeName}${arg.isRequired ? '!' : ''}` : `${arg.name}: $${arg.name}`
    })
    .join(',')
}

export const getMutation = (
  mutationType: MutationType,
  mutations: Array<QueryableField>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  enums: Array<IntrospectionEnumType>,
): GeneratedMutation | undefined => {
  const mutation = mutations.find(({ name }) => name.includes(mutationType))
  if (!mutation) {
    return undefined
  }
  return getMutationObject(mutation, queryableObjectTypes, inputObjectTypes, enums)
}

const getMutationObject = (
  mutation: QueryableField,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  enums: Array<IntrospectionEnumType>,
): GeneratedMutation => {
  const mutationDict = mutation && queryableFieldToNestedDict(mutation.type, queryableObjectTypes)
  const mutationTypeStr = mutationDict && nestedFieldsToString(mutationDict)
  const args = parseArgs(mutation.args, inputObjectTypes, queryableObjectTypes, enums)
  const mutationStr = `
    mutation ${mutation.name}(${stringifyArgs(args, true)}) {
      ${mutation.name}(${stringifyArgs(args, false)})
        ${mutationTypeStr ? ` ${mutationTypeStr}` : ''}
    }
  `

  return {
    mutation: gql`
      ${mutationStr}
    `,
    args,
  }
}

export const getSpecials = (
  mutations: Array<QueryableField>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  enums: Array<IntrospectionEnumType>,
): GeneratedSpecial[] => {
  const specials = mutations.filter(({ name }) => !stringIsMutationType(name))
  return specials.map((mutation) => ({
    ...getMutationObject(mutation, queryableObjectTypes, inputObjectTypes, enums),
    name: mutation.name,
  }))
}
