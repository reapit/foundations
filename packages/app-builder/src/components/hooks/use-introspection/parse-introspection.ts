import { IntrospectionQuery } from 'graphql'

import { notEmpty } from './helpers'
import { getTopLevelFields } from './nested-fields'
import { getListQuery } from './query-generators'
import { isIntrospectionObjectType } from './types'

export const parseIntrospectionResult = (introspection: IntrospectionQuery) => {
  if (!introspection) {
    return null
  }
  const schema = introspection.__schema
  const queryName = schema.queryType.name
  const mutationName = schema.mutationType?.name

  const objectTypes = schema.types.filter(isIntrospectionObjectType)

  const queryType = getTopLevelFields(objectTypes, queryName)
  const mutationType = mutationName ? getTopLevelFields(objectTypes, mutationName) : []

  const queryableObjectTypes = Array.from(new Set(queryType.map((type) => type.nestedType)))
    .map((objectName) => objectTypes.find(({ name }) => name === objectName))
    .filter(notEmpty)

  return queryableObjectTypes.map((object, _, all) => {
    const queries = queryType.filter(({ nestedType }) => object.name === nestedType)

    return {
      object,
      list: getListQuery(queries, all),
      // TODO: check if below are correct
      create: mutationType.find(({ args }) => args.length === 1 && args[0].name === object.name),
      update: mutationType.find(({ args }) => args.length === 2 && args[0].name === object.name),
      delete: mutationType.find(({ args }) => args.length === 1 && args[0].name === 'id'),
    }
  })
}
