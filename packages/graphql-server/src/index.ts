import { ApolloServer } from 'apollo-server-lambda'
import { importSchema } from 'graphql-import'
import resolvers from './resolvers'

const typeDefs = importSchema('./src/schema.graphql')

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  playground: true,
  introspection: true,
})

export const graphqlHandler = server.createHandler()

export default graphqlHandler
