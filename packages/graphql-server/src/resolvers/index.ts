import merge from 'lodash.merge'
import GraphQLJSON from 'graphql-type-json'
import Contact from './contacts/resolvers'
import Areas from './areas/resolvers'
import Offices from './offices/resolvers'
import Appointments from './appointments/resolvers'
import Negotiators from './negotiators/resolvers'
import Properties from './properties/resolvers'
import PropertyImages from './propertyImages/resolvers'
import Configurations from './configurations/resolver'
import IdentityChecks from './identity-checks/resolvers'
import Ping from './ping/resolvers'

export const resolvers = merge(
  {
    JSON: GraphQLJSON,
  },
  Appointments,
  Areas,
  Configurations,
  Contact,
  IdentityChecks,
  Negotiators,
  Offices,
  Ping,
  Properties,
  PropertyImages,
)
export default resolvers
