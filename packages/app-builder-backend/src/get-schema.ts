import { buildSchema } from 'type-graphql'
import { stitchSchemas } from '@graphql-tools/stitch'
import { GraphQLSchema } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { getGraphqlSchemaFromJsonSchema } from 'get-graphql-from-jsonschema'
import Pluralize from 'pluralize'

import { AppResolver } from './resolvers/app-resolver'
import { AuthorResolver } from './resolvers/author-resolver'
import { BookResolver } from './resolvers/book-resolver'
import { ContactResolver } from './resolvers/contact-resolver'
import { KeyResolver } from './resolvers/key-resolver'
import { NegotiatorResolver } from './resolvers/negotiator-resolver'
import { PropertyResolver } from './resolvers/property-resolver'
import { KeyTypeResolver } from './resolvers/key-type-resolver'
import { customAuthChecker } from './utils/auth-checker'
import { OfficeResolver } from './resolvers/offices-resolver'
import { Context } from './types'
import {
  createMetadataObject,
  deleteMetadataObject,
  findMetadataObject,
  getMetadataObject,
  getMetadataSchemas,
  SchemaModel,
  updateMetadataObject,
} from './platform'
import { notEmpty } from './utils/helpers'
import { CustomEntityResolver } from './resolvers/custom-entity-resolver'

const noT = (str: string) => str.split('T0').join('')

const metadataSchemaToGraphQL = (metadataSchema: SchemaModel) => {
  if (!metadataSchema.schema) {
    return
  }

  const output = getGraphqlSchemaFromJsonSchema({
    rootName: metadataSchema.id || 'object',
    schema: JSON.parse(metadataSchema.schema),
  })

  const input = getGraphqlSchemaFromJsonSchema({
    rootName: 'input' + (metadataSchema.id || 'object'),
    schema: JSON.parse(metadataSchema.schema),
    direction: 'input',
  })

  const typeDefinitions = noT([output.typeDefinitions, input.typeDefinitions].flat().join('\n'))
    .split(`type ${noT(output.typeName)} {\n`)
    .join(`type ${noT(output.typeName)} {\n id: ID!\n`)

  return {
    typeDefinitions: typeDefinitions,
    typeName: noT(output.typeName),
    inputTypeName: noT(input.typeName),
  }
}

type Resolvers = { [typeName: string]: (parent: any, args: any, context: Context) => any }

const listMetadataType = (typeName: string) => async (parent, args, context: Context) => {
  const list = await findMetadataObject(typeName, context.accessToken)
  return (
    list
      ?.map(({ metadata, id }) => ({
        ...metadata,
        id,
      }))
      .filter(notEmpty)
      .flat() || []
  )
}

const getMetadataType =
  () =>
  async (parent, { id }: { id: string }, context: Context) => {
    const result = await getMetadataObject(id, context.accessToken)
    return {
      ...result,
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
  const result = await createMetadataObject(typeName, newObject, context.accessToken)
  if (!result) {
    throw new Error('failed to create')
  }

  return {
    ...result.metadata,
    id: result.id,
  }
}

const updateMetadataType = () => async (parent, args: any, context: Context) => {
  const [id, newObject] = Object.values(args)
  const result = await updateMetadataObject(id, newObject, context.accessToken)
  return result
}

const deleteMetadataType =
  () =>
  async (parent, { id }: { id: string }, context: Context) => {
    const result = await deleteMetadataObject(id, context.accessToken)
    return result
  }

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

const generateDynamicSchema = async (context?: Context): Promise<GraphQLSchema | undefined> => {
  let typeDefs = ''
  const resolvers = {
    Query: {},
    Mutation: {},
  }
  let query = ''
  let mutation = ''

  if (context) {
    const metadataSchemas = await getMetadataSchemas(context?.accessToken)
    metadataSchemas
      ?.map(metadataSchemaToGraphQL)
      .filter(notEmpty)
      .forEach(({ typeName, inputTypeName, typeDefinitions }) => {
        typeDefs += typeDefinitions
        const queries = generateQueries(typeName)
        const mutations = generateMutations(typeName, inputTypeName)
        resolvers.Query = { ...resolvers.Query, ...queries.resolvers }
        query += queries.queries
        resolvers.Mutation = { ...resolvers.Mutation, ...mutations.resolvers }
        mutation += mutations.mutations
      })
  }

  const schemaStr = [query && `type Query { ${query} }`, mutation && `type Mutation { ${mutation} }`]
    .filter(notEmpty)
    .join('\n')

  const typeDefinitions = [typeDefs, schemaStr].join('\n')

  return typeDefinitions.trim()
    ? makeExecutableSchema({
        typeDefs: typeDefinitions,
        resolvers,
      })
    : undefined
}

export const getSchema = async (context?: Context) => {
  const baseSchema = await buildSchema({
    resolvers: [
      BookResolver,
      AuthorResolver,
      AppResolver,
      PropertyResolver,
      KeyResolver,
      ContactResolver,
      NegotiatorResolver,
      KeyTypeResolver,
      OfficeResolver,
      CustomEntityResolver,
    ],
    authChecker: customAuthChecker,
  })

  const subschemas = [{ schema: baseSchema }]

  const dynamicSchema = await generateDynamicSchema(context)

  if (dynamicSchema) {
    subschemas.push({ schema: dynamicSchema })
  }

  return stitchSchemas({
    subschemas,
  })
}
