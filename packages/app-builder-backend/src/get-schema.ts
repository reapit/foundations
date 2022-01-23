import { buildSchema } from 'type-graphql'
import { stitchSchemas } from '@graphql-tools/stitch'

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
import * as graphql from 'graphql'
import { GraphQLSchema } from 'graphql'

const fakeDatabase = {
  a: {
    id: 'a',
    name: 'alice',
  },
  b: {
    id: 'b',
    name: 'bob',
  },
}

const generateDynamicSchema = async (): Promise<GraphQLSchema> => {
  const dynamicThingType = new graphql.GraphQLObjectType({
    name: 'DynamicThing',
    fields: {
      id: { type: graphql.GraphQLString },
      name: { type: graphql.GraphQLString },
    },
  })

  const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      dynamicThing: {
        type: dynamicThingType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: graphql.GraphQLString },
        },
        resolve: (_, { id }) => {
          return fakeDatabase[id]
        },
      },
    },
  })

  return new graphql.GraphQLSchema({ query: queryType })
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
    ],
    authChecker: customAuthChecker,
  })

  console.log(context)

  return stitchSchemas({
    subschemas: [{ schema: baseSchema }, { schema: await generateDynamicSchema() }],
  })
}
