import { ApolloServer, Request, ServerInfo } from 'apollo-server'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { importSchema } from 'graphql-import'
import depthLimit from 'graphql-depth-limit'
import resolvers from './resolvers'
import logger from './logger'

const typeDefs = importSchema('./src/schema.graphql')

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  logger.error('formatError', error)
  return { message: error.message, extensions: { code: error.extensions?.code } }
}

export const context = ({ req }: { req: Request }) => {
  logger.info('context', req)
  // Pass context from request to apollo client
  return {
    user: {},
  }
}

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  formatError,
  context,
  validationRules: [depthLimit(10)],
  cors: {
    origin: [],
    methods: ['POST', 'OPTION', 'GET'],
  },
  formatResponse: (response, requestContext) => {
    logger.info('formatResponse', { response, requestContext })
    return response || {}
  },
})

// The `listen` method launches a web server.
server.listen({ port: 4000 }).then(({ url }: ServerInfo) => {
  logger.info(`🚀  Server ready at ${url}`)
})
