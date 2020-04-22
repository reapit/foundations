import merge from 'lodash.merge'
import GraphQLJSON from 'graphql-type-json'
import Contact from './contacts/resolvers'
import Areas from './areas/resolvers'
import Offices from './offices/resolvers'
import Appointments from './appointments/resolvers'
import Negotiators from './negotiators/resolvers'
<<<<<<< HEAD
import Properties from './properties/resolvers'
import PropertyTypes from './property-types/resolver'
=======
import Configurations from './configurations/resolver'
>>>>>>> support GET configurations and configuration (by ID) by pre-defined types

export const resolvers = merge(
  {
    JSON: GraphQLJSON,
  },
  Contact,
  Areas,
  Offices,
  Appointments,
  Negotiators,
<<<<<<< HEAD
  Properties,
  PropertyTypes,
=======
  Configurations,
>>>>>>> support GET configurations and configuration (by ID) by pre-defined types
)
export default resolvers
