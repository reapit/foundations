import { IntrospectionField, IntrospectionObjectType, IntrospectionQuery } from 'graphql'

import { flatKind, getObjectType, notEmpty } from './helpers'
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
import {
  isIntrospectionEnumType,
  isIntrospectionInputObjectType,
  isIntrospectionObjectType,
  isNonNullType,
  QueryableField,
} from './types'

export type IntrospectionResult = {
  object: Omit<IntrospectionObjectType, 'fields'> & { fields: QueryableField[] }
  supportsCustomFields: boolean
  acKeyField?: IntrospectionField & { acKey: string }
  labelKeys?: string[]
  list?: GeneratedQuery
  search?: GeneratedQuery
  get?: GeneratedQuery
  create?: GeneratedMutation
  update?: GeneratedMutation
  delete?: GeneratedMutation
  specials: GeneratedSpecial[]
  notTopLevel?: boolean
}

const fieldToQueryableField = (field: IntrospectionField): QueryableField => {
  return {
    ...field,
    nestedKinds: flatKind(field.type),
    nestedType: getObjectType(field.type),
    isRequired: isNonNullType(field.type),
  }
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
        const { description } = field
        if (!description) {
          return undefined
        }
        if (description.includes('@acKey')) {
          return {
            ...field,
            acKey: description.split('@acKey(')[1].split(')')[0],
          }
        }
        return undefined
      })
      .filter(notEmpty)[0] as IntrospectionField & { acKey: string }

    return {
      object: {
        ...object,
        fields: object.fields.filter(({ name }) => !name.startsWith('_placeholder')).map(fieldToQueryableField),
      },
      notTopLevel: object.description?.includes('@notTopLevel') ?? false,
      labelKeys,
      acKeyField,
      supportsCustomFields: !!object.description?.includes('@supportsCustomFields()'),
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
