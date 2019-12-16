import GraphQLJSON from 'graphql-type-json'
import contactResolvers from './contact/resolvers'
import contactIdentityCheckResolvers from './contact-identity-check/resolvers'

export const resolvers = {
  ...contactResolvers,
  ...contactIdentityCheckResolvers,
  JSON: GraphQLJSON,
}

export default resolvers
