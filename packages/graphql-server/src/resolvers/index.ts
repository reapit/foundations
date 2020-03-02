import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts, createContact, updateContact } from './contact/resolvers'
import {
  createIdentityCheck,
  queryIdentityChecks,
  queryIdentityCheckById,
  updateIdentityCheck,
} from './identity-check/resolvers'
import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from './area/resolvers'

export const resolvers = {
  Query: {
    GetContactById: queryContact,
    GetContacts: queryContacts,
    GetIdCheckById: queryIdentityCheckById,
    GetIdChecks: queryIdentityChecks,
    area: queryArea,
    areas: queryAreas,
  },
  Mutation: {
    CreateIdentityCheck: createIdentityCheck,
    UpdateIdentityCheck: updateIdentityCheck,
    createArea: mutationCreateArea,
    updateArea: mutationUpdateArea,
    CreateContact: createContact,
    UpdateContact: updateContact,
  },
  JSON: GraphQLJSON,
}

export default resolvers
