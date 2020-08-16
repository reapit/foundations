import { PagedResultWorksOrderModel_ } from '../../types'
import { UserInputError, AuthenticationError } from 'apollo-server-lambda'

export { WorksOrders as GetWorksOrdersArgs } from '../../types'

// api return types
export type GetWorksOrdersReturn = Promise<PagedResultWorksOrderModel_ | UserInputError>

// resolver return types
export type QueryGetWorksOrdersReturn = AuthenticationError | GetWorksOrdersReturn
