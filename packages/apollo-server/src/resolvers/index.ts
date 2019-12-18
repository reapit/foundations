import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts, contactsResolvers } from './contact/resolvers'
import { createContactIdentityCheck } from './contact-identity-check/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
  },
  Mutation: {
    createContactIdentityCheck,
  },
  Contacts: contactsResolvers,
  JSON: GraphQLJSON,
}

export default resolvers
