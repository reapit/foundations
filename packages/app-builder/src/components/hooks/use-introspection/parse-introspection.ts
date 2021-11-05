import { IntrospectionField, IntrospectionObjectType, IntrospectionQuery } from 'graphql'

import { notEmpty } from './helpers'
import { getTopLevelFields } from './nested-fields'
import {
  getMutation,
  getListQuery,
  getGetQuery,
  getSpecials,
  GeneratedSpecial,
  GeneratedMutation,
  GeneratedQuery,
} from './query-generators'
import { isIntrospectionEnumType, isIntrospectionInputObjectType, isIntrospectionObjectType } from './types'

export type IntrospectionResult = {
  object: IntrospectionObjectType
  acKeyField?: IntrospectionField & { acKey: string }
  labelKeys?: string[]
  list?: GeneratedQuery
  search?: GeneratedQuery
  get?: GeneratedQuery
  create?: GeneratedMutation
  update?: GeneratedMutation
  delete?: GeneratedMutation
  specials: GeneratedSpecial[]
}

export const parseIntrospectionResult = (introspection: IntrospectionQuery): IntrospectionResult[] | undefined => {
  if (!introspection) {
    return undefined
  }
  const schema = introspection.__schema
  const queryName = schema.queryType.name
  const mutationName = schema.mutationType?.name

  const objectTypes = schema.types.filter(isIntrospectionObjectType)
  const inputObjectTypes = schema.types.filter(isIntrospectionInputObjectType)
  const enums = schema.types.filter(isIntrospectionEnumType)

  const queryType = getTopLevelFields(objectTypes, queryName)
  const mutationType = mutationName ? getTopLevelFields(objectTypes, mutationName) : []

  const queryableObjectTypes = Array.from(new Set(queryType.map((type) => type.nestedType)))
    .map((objectName) => objectTypes.find(({ name }) => name === objectName))
    .filter(notEmpty)
    .filter(({ name }) => !name.startsWith('_'))

  return queryableObjectTypes.map((object) => {
    const queries = queryType.filter(({ nestedType }) => object.name === nestedType)
    const mutations = mutationType.filter(({ nestedType }) => object.name === nestedType)
    const labelKeys = object.description
      ?.split('@labelKeys(')[1]
      ?.split(')')[0]
      ?.split(',')
      .map((s) => s.trim())

    const acKeyField = object.fields
      .map((field) => {
        const acKey = field?.description?.split('@acKey(')[1].split(')')[0]
        if (acKey) {
          return { ...field, acKey }
        }
      })
      .filter(notEmpty)[0]

    return {
      object,
      labelKeys,
      acKeyField,
      list: getListQuery(queries, objectTypes, inputObjectTypes, enums, false),
      search: getListQuery(queries, objectTypes, inputObjectTypes, enums, true),
      get: getGetQuery(queries, objectTypes, inputObjectTypes, enums),
      create: getMutation('create', mutations, objectTypes, inputObjectTypes, enums),
      update: getMutation('update', mutations, objectTypes, inputObjectTypes, enums),
      delete: getMutation('delete', mutations, objectTypes, inputObjectTypes, enums),
      specials: getSpecials(mutations, objectTypes, inputObjectTypes, enums),
    }
  })
}
