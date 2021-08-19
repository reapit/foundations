import { IntrospectionQuery } from 'graphql'

import { notEmpty } from './helpers'
import { getTopLevelFields } from './nested-fields'
import { getMutation, getListQuery } from './query-generators'
import { isIntrospectionEnumType, isIntrospectionInputObjectType, isIntrospectionObjectType } from './types'

export const parseIntrospectionResult = (introspection: IntrospectionQuery) => {
  if (!introspection) {
    return null
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

  return queryableObjectTypes.map((object, _, all) => {
    const queries = queryType.filter(({ nestedType }) => object.name === nestedType)
    const mutations = mutationType.filter(({ nestedType }) => object.name === nestedType)
    return {
      object,
      list: getListQuery(queries, all),
      create: getMutation('create', mutations, all, inputObjectTypes, enums),
      update: getMutation('update', mutations, all, inputObjectTypes, enums),
      delete: getMutation('delete', mutations, all, inputObjectTypes, enums),
    }
  })
}
