import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts } from './contact/resolvers'
import { createContactIdentityCheck } from './contact-identity-check/resolvers'
import { login } from './auth/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
  },
  Mutation: {
    login,
    createContactIdentityCheck,
  },
  JSON: GraphQLJSON,
}

export default resolvers
