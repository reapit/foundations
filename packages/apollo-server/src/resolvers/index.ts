import GraphQLJSON from 'graphql-type-json'
import { queryContact } from './contact/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
  },
  Mutation: {},
  JSON: GraphQLJSON,
}

export default resolvers
