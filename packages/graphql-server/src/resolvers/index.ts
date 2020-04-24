import merge from 'lodash.merge'
import GraphQLJSON from 'graphql-type-json'
import Contact from './contacts/resolvers'
import Areas from './areas/resolvers'
import Offices from './offices/resolvers'
import Appointments from './appointments/resolvers'
import Negotiators from './negotiators/resolvers'
import Properties from './properties/resolvers'

export const resolvers = merge(
  {
    JSON: GraphQLJSON,
  },
  Contact,
  Areas,
  Offices,
  Appointments,
  Negotiators,
  Properties,
)
export default resolvers
