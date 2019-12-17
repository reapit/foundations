import GraphQLJSON from 'graphql-type-json'
import { queryContact } from './contact/resolvers'
import { createContactIdentityCheck } from './contact-identity-check/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
  },
  Mutation: {
    createContactIdentityCheck,
  },
  JSON: GraphQLJSON,
}

export default resolvers
