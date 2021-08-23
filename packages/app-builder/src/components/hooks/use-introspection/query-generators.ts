import {
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
} from './types'

export const getListQuery = (queries: Array<QueryableField>, queryableObjectTypes: Array<IntrospectionObjectType>) => {
  const list = queries.find(({ nestedKinds }) => nestedKinds.includes(TypeKind.LIST))
  const listDict = list && queryableFieldToNestedDict(list.type, queryableObjectTypes)
  const listTypeStr = listDict && nestedFieldsToString(listDict)
  const listQuery = list && `{ ${list.name}${listTypeStr ? ` ${listTypeStr}` : ''} }`

  return gql`
    ${listQuery}
  `
}

type ParsedArg = {
  name: string
  isRequired: boolean
  typeName: string
  idOfType?: string
  enumValues?: Array<string>
  fields?: Array<ParsedArg>
}

const parseArgs = (
  args: Readonly<Array<IntrospectionInputValue>>,
  inputObjectTypes: Array<IntrospectionInputTypeRef>,
  queryableObjectTypes: Array<IntrospectionObjectType>,
  enums: Array<IntrospectionEnumType>,
): Array<ParsedArg> => {
  return args.map((arg) => {
    const { name, type } = arg
    let typeName = isIntrospectionScalarType(type) ? type.name : ''
    let actualType = type
    let idOfType

    if (isNonNullInputType(type)) {
      typeName = type.ofType.name
      actualType = type.ofType
    }

    const actualTypeObject =
      isIntrospectionInputObjectType(actualType) &&
      inputObjectTypes.find((a) => isIntrospectionInputObjectType(a) && a.name === typeName)

    if (typeName === 'ID' && name !== 'id') {
      const idName = name.replace('Id', '')
      idOfType = queryableObjectTypes.find((a) => a.name.toLowerCase() === idName)?.name
    }

    const enumValues = enums.find(({ name }) => name === typeName)?.enumValues.map((e) => e.name)

    return {
      name,
      isRequired: isNonNullInputType(type),
      typeName,
      idOfType,
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
) => {
  const mutation = mutations.find(({ name }) => name.includes(mutationType))
  if (!mutation) {
    return undefined
  }
  const mutationDict = mutation && queryableFieldToNestedDict(mutation.type, queryableObjectTypes)
  const mutationTypeStr = mutationDict && nestedFieldsToString(mutationDict)
  const args = parseArgs(mutation.args, inputObjectTypes, queryableObjectTypes, enums)
  const mutationStr = `mutation ${mutation.name}(${stringifyArgs(args, true)}) { ${mutation.name}(${stringifyArgs(
    args,
    false,
  )})${mutationTypeStr ? ` ${mutationTypeStr}` : ''} }`

  return {
    mutation: gql`
      ${mutationStr}
    `,
    args,
  }
}
