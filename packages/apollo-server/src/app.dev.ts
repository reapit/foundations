import { ApolloServer } from 'apollo-server'
import { importSchema }  from 'graphql-import'
import resolvers from './resolvers'
import logger from './logger'

const typeDefs = importSchema('./src/schema.graphql')

const server = new ApolloServer({ typeDefs: typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`)
  console.log(`🚀  Server ready at ${url}`);
});
