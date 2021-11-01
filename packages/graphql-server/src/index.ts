import { ApolloServer } from 'apollo-server-lambda'
import { config } from './graphql-common'

const server = new ApolloServer(config)

export const graphqlHandler = server.createHandler()
