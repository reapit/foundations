import { PagedResultWorksOrderModel_ } from '../../types'
import { UserInputError, AuthenticationError } from 'apollo-server-lambda'

import { WorksOrders, WorksOrderModel } from '../../types'

export { WorksOrders as GetWorksOrdersArgs }

export { CreateWorksOrderModel as CreateWorksOrderArgs } from '../../types'

// args

export type GetWorksOrdersByIdArgs = {
  id: string
  embed?: 'company' | 'documents' | 'negotiator' | 'property' | 'tenancy' | 'type'
}

// api return types
export type GetWorksOrdersReturn = Promise<PagedResultWorksOrderModel_ | UserInputError>
export type GetWorksOrderByIdReturn = Promise<WorksOrderModel | UserInputError>

// resolver return types
export type QueryGetWorksOrdersReturn = AuthenticationError | GetWorksOrdersReturn
export type QueryGetWorksOrdersByIdReturn = AuthenticationError | GetWorksOrderByIdReturn
