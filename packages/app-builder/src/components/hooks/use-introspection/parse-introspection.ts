import { IntrospectionQuery } from 'graphql'

import { notEmpty } from './helpers'
import { getTopLevelFields } from './nested-fields'
import { getMutation, getListQuery, getGetQuery, getSpecials } from './query-generators'
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
    .filter(({ name }) => !name.startsWith('_'))

  return queryableObjectTypes.map((object) => {
    const queries = queryType.filter(({ nestedType }) => object.name === nestedType)
    const mutations = mutationType.filter(({ nestedType }) => object.name === nestedType)
    return {
      object,
      list: getListQuery(queries, objectTypes, inputObjectTypes, enums),
      get: getGetQuery(queries, objectTypes, inputObjectTypes, enums),
      create: getMutation('create', mutations, objectTypes, inputObjectTypes, enums),
      update: getMutation('update', mutations, objectTypes, inputObjectTypes, enums),
      delete: getMutation('delete', mutations, objectTypes, inputObjectTypes, enums),
      specials: getSpecials(mutations, objectTypes, inputObjectTypes, enums),
    }
  })
}
