import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts } from './contact/resolvers'
import {
  createIdentityCheck,
  queryIdentityChecks,
  queryIdentityCheck,
  updateIdentityCheck,
} from './identity-check/resolvers'
import { login } from './auth/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
    getIdentityCheck: queryIdentityCheck,
    getIdentityChecks: queryIdentityChecks,
  },
  Mutation: {
    login,
    createIdentityCheck,
    updateIdentityCheck,
  },
  JSON: GraphQLJSON,
}

export default resolvers
