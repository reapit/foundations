import { buildSchema } from 'type-graphql'
import { stitchSchemas } from '@graphql-tools/stitch'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { delegateToSchema } from '@graphql-tools/delegate'

import Pluralize from 'pluralize'

import { AppResolver } from './resolvers/app-resolver'
import { ContactResolver } from './resolvers/contact-resolver'
import { KeyResolver } from './resolvers/key-resolver'
import { NegotiatorResolver } from './resolvers/negotiator-resolver'
import { PropertyResolver } from './resolvers/property-resolver'
import { KeyTypeResolver } from './resolvers/key-type-resolver'
import { customAuthChecker } from './utils/auth-checker'
import { OfficeResolver } from './resolvers/offices-resolver'
import { ApplicantResolver } from './resolvers/applicant-resolver'
import { Context } from './types'
import {
  createMetadataObject,
  deleteMetadataObject,
  findMetadataObject,
  getMetadataObject,
  updateMetadataObject,
} from './platform'
import { notEmpty } from './utils/helpers'
import { CustomEntityResolver } from './resolvers/custom-entity-resolver'
import { CustomEntity, CustomEntityField } from './entities/custom-entity'
import { extractMetadata, isIdEntityType } from './utils/extract-metadata'
import { AppointmentResolver } from './resolvers/appointment-resolver'
import { CompanyResolver } from './resolvers/company-resolver'
import { OfferResolver } from './resolvers/offer-resolver'
import { PropertyImageResolver } from './resolvers/property-image-resolver'

const customEntityFieldTypeToGraphQLType = (fieldType: CustomEntityField['type']) => {
  switch (fieldType) {
    case 'string':
      return 'String'
    case 'number':
      return 'Int'
    default:
      return 'String'
  }
}

const customEntityToTypeDefs = (
  customEntity: CustomEntity,
  { rootName, direction = 'output' }: { rootName: string; direction?: 'input' | 'output' },
) => {
  const fields = customEntity.fields
    .map((field) => `${field.name}: ${customEntityFieldTypeToGraphQLType(field.type)}`)
    .join('\n')

  const typeDefinitions = `${direction === 'output' ? 'type' : 'input'} ${rootName} {
    id: ID!
    ${fields}
  }`

  return {
    typeDefinitions,
    typeName: rootName,
  }
}

const customEntityToGraphQL = (
  customEntity: CustomEntity,
): { typeDefinitions: string; typeName: string; inputTypeName: string; customEntity: CustomEntity } => {
  const output = customEntityToTypeDefs(customEntity, {
    rootName: customEntity.name || 'object',
  })

  const input = customEntityToTypeDefs(customEntity, {
    rootName: (customEntity.name || 'object') + 'Input',
    direction: 'input',
  })

  const typeDefinitions = [output.typeDefinitions, input.typeDefinitions].flat().join('\n')

  return {
    typeDefinitions,
    typeName: output.typeName,
    inputTypeName: input.typeName,
    customEntity,
  }
}

type Resolvers = { [typeName: string]: (parent: any, args: any, context: Context) => any }

const listMetadataType = (typeName: string) => async (parent, args, context: Context) => {
  const list = await findMetadataObject(typeName, context.accessToken)
  return (
    list
      ?.map(({ metadata, id }) => {
        const data = metadata?.appBuilderData ? JSON.parse(metadata.appBuilderData) : {}
        return {
          ...data,
          id,
        }
      })
      .filter(notEmpty)
      .flat() || []
  )
}

const getMetadataType =
  () =>
  async (parent, { id }: { id: string }, context: Context) => {
    const result = await getMetadataObject(id, context.accessToken)
    const data = result?.appBuilderData ? JSON.parse(result.appBuilderData) : {}
    return {
      ...data,
      id,
    }
  }

const searchMetadataType =
  (typeName: string) =>
  async (parent, { query }: { query: string }, context: Context) => {
    const list = await listMetadataType(typeName)(parent, {}, context)
    return list.filter((obj) => {
      return Object.values(obj).some((val: any) => val.toString().toLowerCase().includes(query.toLowerCase()))
    })
  }

const createMetadataType = (typeName: string) => async (parent, args: any, context: Context) => {
  const [newObject] = Object.values(args)
  const result = await createMetadataObject(
    typeName,
    { appBuilderData: JSON.stringify(newObject) },
    context.accessToken,
  )
  if (!result) {
    throw new Error('failed to create')
  }

  return {
    ...result,
    id: result.id,
  }
}

const updateMetadataType = () => (parent, args: any, context: Context) => {
  const [id, newObject] = Object.values(args)
  return updateMetadataObject(id, { appBuilderData: JSON.stringify(newObject) }, context.accessToken)
}

const deleteMetadataType =
  () =>
  (parent, { id }: { id: string }, context: Context) =>
    deleteMetadataObject(id, context.accessToken)

const generateQueries = (typeName: string): { queries: string; resolvers: Resolvers } => {
  const listName = `list${Pluralize.plural(typeName)}`
  const searchName = `search${Pluralize.plural(typeName)}`
  const getName = `get${typeName}`

  const queries = [
    `${listName}: [${typeName}]`,
    `${getName}(id: ID!): ${typeName}`,
    `${searchName}(query: String!): [${typeName}]`,
  ].join('\n')

  const resolvers = {
    [listName]: listMetadataType(typeName),
    [getName]: getMetadataType(),
    [searchName]: searchMetadataType(typeName),
  }

  return {
    queries,
    resolvers,
  }
}

const generateMutations = (typeName: string, inputTypeName: string): { mutations: string; resolvers: Resolvers } => {
  const createName = `create${typeName}`
  const updateName = `update${typeName}`
  const deleteName = `delete${typeName}`

  const mutations = [
    `${createName}(new${typeName}: ${inputTypeName}!): ${typeName}`,
    `${updateName}(id: ID!, new${typeName}: ${inputTypeName}!): ${typeName}`,
    `${deleteName}(id: ID!): ${typeName}`,
  ].join('\n')

  const resolvers = {
    [createName]: createMetadataType(typeName),
    [updateName]: updateMetadataType(),
    [deleteName]: deleteMetadataType(),
  }

  return {
    mutations,
    resolvers,
  }
}

const delegationResolver = (baseSchema: GraphQLSchema) => (root, args, context, info) => {
  if (!context) {
    throw new Error('no context')
  }
  const [argName, argValue] = Object.entries(args).filter(([name]) => name !== 'id')[0]
  if (!isIdEntityType(argName)) {
    throw new Error('no id')
  }
  const { metadata, ...cleanObj } = extractMetadata(context, argName, argValue)
  context.operationMetadata[argName] = metadata
  return delegateToSchema({
    schema: baseSchema,
    operation: info.operation.operation,
    fieldName: info.fieldName,
    args: { [argName]: cleanObj },
    context,
    info,
  })
}

const metadataResolver = (root: any, args: any, context: Context, info: GraphQLResolveInfo) => {
  if (!info.path.typename) {
    return ''
  }
  const lcTypeName = info.path.typename.toLowerCase()
  if (!isIdEntityType(lcTypeName)) {
    return ''
  }
  return context.getCachedMetadata(lcTypeName, root.id, info.path.key as string)
}

type Resolver = (root: any, args: any, context: Context, info: GraphQLResolveInfo) => void

const generateDynamicSchema = (
  baseSchema: GraphQLSchema,
  context?: Context,
): {
  schema: GraphQLSchema | undefined
  extendedTypedefs: string
  resolvers: Record<string, Record<string, Resolver>>
} => {
  let typeDefs = ''
  const resolvers = {
    Query: {},
    Mutation: {},
  }
  let query = ''
  let mutation = ''

  let extendedTypedefs = ''

  const Mutation: Record<string, Resolver> = {}
  const TypeResolvers: Record<string, Record<string, Resolver>> = {}
  if (context?.customEntities) {
    context.customEntities
      .map(customEntityToGraphQL)
      .filter(notEmpty)
      .forEach(({ typeName, inputTypeName, typeDefinitions, customEntity }) => {
        if (baseSchema.getType(typeName)) {
          extendedTypedefs += typeDefinitions
            .split(`type ${typeName}`)
            .join(`extend type ${typeName}`)
            .split(`input ${inputTypeName}`)
            .join(`extend input ${inputTypeName}`)
            .split('id: ID!')
            .join('')
          const createName = `create${typeName}`
          Mutation[createName] = delegationResolver(baseSchema)
          const updateName = `update${typeName}`
          Mutation[updateName] = delegationResolver(baseSchema)
          TypeResolvers[typeName] = {}
          customEntity.fields.forEach((field) => {
            const fieldName = field.name
            TypeResolvers[typeName][fieldName] = metadataResolver
          })
        } else {
          typeDefs += typeDefinitions.split(`type ${typeName}`).join(`\n"@supportsCustomFields()"\ntype ${typeName}`)

          const queries = generateQueries(typeName)
          const mutations = generateMutations(typeName, inputTypeName)
          resolvers.Query = { ...resolvers.Query, ...queries.resolvers }
          query += '\n' + queries.queries
          resolvers.Mutation = { ...resolvers.Mutation, ...mutations.resolvers }
          mutation += '\n' + mutations.mutations
        }
      })
  }

  const schemaStr = [query && `type Query { ${query} }`, mutation && `type Mutation { ${mutation} }`]
    .filter(notEmpty)
    .join('\n')

  const allTypeDefinitions = [typeDefs, schemaStr].join('\n')

  const schema = allTypeDefinitions.trim()
    ? makeExecutableSchema({
        typeDefs: allTypeDefinitions,
        resolvers,
      })
    : undefined

  return {
    schema,
    extendedTypedefs,
    resolvers: {
      Mutation,
      ...TypeResolvers,
    },
  }
}

export const getSchema = async (context?: Context): Promise<GraphQLSchema> => {
  const baseSchema = await buildSchema({
    resolvers: [
      AppResolver,
      PropertyResolver,
      KeyResolver,
      ContactResolver,
      NegotiatorResolver,
      KeyTypeResolver,
      OfficeResolver,
      CustomEntityResolver,
      ApplicantResolver,
      AppointmentResolver,
      CompanyResolver,
      OfferResolver,
      PropertyImageResolver,
    ],
    authChecker: customAuthChecker,
  })

  const subschemas = [{ schema: baseSchema }]

  const { schema, extendedTypedefs, resolvers } = generateDynamicSchema(baseSchema, context)

  if (schema) {
    subschemas.push({
      schema,
    })
  }

  const schemas = stitchSchemas({
    subschemas,
    typeDefs: extendedTypedefs,
    resolvers,
  })

  return schemas
}
