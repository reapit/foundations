import { ApolloServer } from 'apollo-server-lambda'
import { importSchema } from 'graphql-import'
import { Context } from 'apollo-server-core'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import uuidv4 from 'uuid/v4'
import resolvers from './resolvers'
import depthLimit from 'graphql-depth-limit'
import logger from './logger'
import * as Sentry from '@sentry/node'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.APP_VERSION,
    environment: process.env.APP_ENV,
  })
}

export type ServerContext = Context<{ traceId: string; authorization: string }>

const typeDefs = importSchema('./src/schema.graphql')
export const handleContext = ({ event, context }) => {
  const traceId = uuidv4()
  const isProductionEnv = process.env.NODE_ENV === 'production'
  if (isProductionEnv) {
    logger.info('handleContext', { traceId, event })
  }
  return {
    traceId: traceId,
    headers: event.headers,
    authorization: event?.headers?.Authorization || '',
    functionName: context.functionName,
    event,
    context,
  }
}

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (process.env.NODE_ENV === 'production') {
    return { message: error.message, extensions: { code: error.extensions?.code } }
  }
  return error
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
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

export default graphqlHandler
