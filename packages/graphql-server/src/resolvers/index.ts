import merge from 'lodash.merge'
import GraphQLJSON from 'graphql-type-json'
import Contact from './contacts/resolvers'
import Areas from './areas/resolvers'
import Offices from './offices/resolvers'
import Appointments from './appointments/resolvers'
import Negotiators from './negotiators/resolvers'
import Properties from './properties/resolvers'
import Configurations from './configurations/resolver'
import IdentityChecks from './identity-checks/resolvers'
import Ping from './ping/resolvers'

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
  Configurations,
  IdentityChecks,
  Ping,
)
export default resolvers
