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
import Tenancies from './tenancies/resolvers'
import Applicants from './applicants/resolvers'
import Offers from './offers/resolvers'
import Vendors from './vendors/resolvers'
import Companies from './companies/resolvers'
import Conveyancing from './conveyancing/resolvers'
import Landlords from './landlords/resolvers'
import Tasks from './tasks/resolvers'
import Departments from './departments/resolvers'

export const resolvers = merge(
  {
    JSON: GraphQLJSON,
  },
  Applicants,
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
  Tasks,
  Tenancies,
  Offers,
  Vendors,
  Companies,
  Conveyancing,
  Landlords,
  Departments,
)
export default resolvers
