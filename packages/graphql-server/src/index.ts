import { ApolloServer } from 'apollo-server-lambda'
import { importSchema } from 'graphql-import'
import uuidv4 from 'uuid/v4'
import { formatError, formatResponse } from './app'
import resolvers from './resolvers'
import depthLimit from 'graphql-depth-limit'
import logger from './logger'

const typeDefs = importSchema('./src/schema.graphql')
const handleContext = ({ event, context }) => {
  const traceId = uuidv4()
  const isProductionEnv = process.env.NODE_ENV === 'production'
  if (isProductionEnv) {
    logger.info('handleContext', { traceId, event })
  }
  return {
    traceId: traceId,
    authorization: event?.headers?.Authorization || '',
    functionName: context.functionName,
    event,
    context,
  }
}

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  formatError,
  uploads: false,
  context: handleContext,
  validationRules: [depthLimit(10)],
  formatResponse,
})

export const graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})

export default graphqlHandler
