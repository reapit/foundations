import path from 'path'
import express from 'express'
import uuidv4 from 'uuid/v4'
import { ApolloServer, ServerInfo } from 'apollo-server'
import { ContextFunction, Context, GraphQLResponse, GraphQLRequestContext } from 'apollo-server-core'
import { ExecutionParams } from 'subscriptions-transport-ws'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { importSchema } from 'graphql-import'
import depthLimit from 'graphql-depth-limit'
import logger from './logger'
import resolvers from './resolvers'

const typeDefs = importSchema('./src/schema.graphql')

if (process.env.NODE_ENV === 'development') {
  const envConfig = require(path.resolve(__dirname, '../../..', 'reapit-config.json'))
  const configs = envConfig[process.env.REAPIT_ENV || 'LOCAL']
  for (const k in configs) {
    process.env[k] = configs[k]
  }
}

export type ExpressContext = {
  req: express.Request
  res: express.Response
  connection?: ExecutionParams
}

export type ServerContext = Context<{ traceId: string; authorization: string }>
export type GraphQLContextFunction = ContextFunction<ExpressContext, ServerContext> | Context<ServerContext>

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (process.env.NODE_ENV === 'production') {
    return { message: error.message, extensions: { code: error.extensions?.code } }
  }
  return error
}

export const handleContext = ({ req }: ExpressContext): GraphQLContextFunction => {
  const traceId = uuidv4()
  const isProductionEnv = process.env.NODE_ENV === 'production'
  if (isProductionEnv) {
    logger.info('handleContext', { traceId, req })
  }
  const authorization = req.headers.authorization || ''
  return {
    traceId: traceId,
    authorization: authorization,
  }
}

export const formatResponse = (
  response: GraphQLResponse | null,
  requestContext: GraphQLRequestContext<{ traceId?: string }>,
): GraphQLResponse => {
  const traceId = requestContext.context?.traceId
  const isProductionEnv = process.env.NODE_ENV === 'production'
  if (isProductionEnv) {
    logger.info('formatResponse', { traceId, requestContext, response })
  }
  return response || {}
}

export const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  formatError,
  context: handleContext,
  uploads: false,
  validationRules: [depthLimit(10)],
  cors: {
    origin: '*',
    methods: ['POST', 'OPTION', 'GET'],
  },
  debug: process.env.NODE_ENV === 'development',
  formatResponse,
})

export const listenCallback = ({ url }: ServerInfo) => {
  logger.info(`🚀  Server ready at ${url}`)
}

// The `listen` method launches a web server.
server.listen({ port: process.env.SERVER_PORT || 4000 }).then(listenCallback)
