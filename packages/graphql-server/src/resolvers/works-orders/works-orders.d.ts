import { PagedResultWorksOrderModel_ } from '../../types'
import { UserInputError, AuthenticationError } from 'apollo-server-lambda'

import { WorksOrders, WorksOrderModel, UpdateWorksOrderModel } from '../../types'

export { WorksOrders as GetWorksOrdersArgs }

export { CreateWorksOrderModel as CreateWorksOrderArgs } from '../../types'

export type UpdateWorksOrderArgs = { id: string; _eTag: string } & UpdateWorksOrderModel

// args

export type GetWorksOrdersByIdArgs = {
  id: string
  embed?: 'company' | 'documents' | 'negotiator' | 'property' | 'tenancy' | 'type'
}

// api return types

export type GetWorksOrdersReturn = Promise<PagedResultWorksOrderModel_ | UserInputError>
export type GetWorksOrderByIdReturn = Promise<WorksOrderModel | UserInputError>
export type CreateWorksOrderReturn = GetWorksOrderByIdReturn
export type UpdateWorksOrderReturn = GetWorksOrderByIdReturn

// resolver return types

export type QueryGetWorksOrdersReturn = AuthenticationError | GetWorksOrdersReturn
export type QueryGetWorksOrdersByIdReturn = AuthenticationError | GetWorksOrderByIdReturn
export type MutationCreateWorksOrder = QueryGetWorksOrdersByIdReturn
export type MutationUpdateWorksOrder = QueryGetWorksOrdersByIdReturn
