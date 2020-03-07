import merge from 'lodash.merge'
import GraphQLJSON from 'graphql-type-json'
import Contact from './contacts/resolvers'
import Areas from './areas/resolvers'
import Offices from './offices/resolvers'
import Appointments from './appointments/resolvers'

export const resolvers = merge(
  {
    JSON: GraphQLJSON,
  },
  Contact,
  Areas,
  Offices,
  Appointments,
)
export default resolvers
