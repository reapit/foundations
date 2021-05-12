import { ApolloServer } from 'apollo-server-lambda'
import { importSchema } from 'graphql-import'
import resolvers from './resolvers'
import depthLimit from 'graphql-depth-limit'
import * as Sentry from '@sentry/node'
import { handleContext, formatError } from './utils'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

const typeDefs = importSchema('./src/schema.graphql')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV === 'development',
  introspection: true,
  formatError,
  uploads: false,
  context: handleContext,
  validationRules: [depthLimit(10)],
})

export const graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
