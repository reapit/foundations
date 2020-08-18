import { PagedResultWorksOrderModel_ } from '../../types'
import { UserInputError, AuthenticationError } from 'apollo-server-lambda'

import { WorksOrderModel, UpdateWorksOrderModel, PagedResultWorksOrderItemModel_ } from '../../types'

export { CreateWorksOrderModel as CreateWorksOrderArgs, WorksOrders as GetWorksOrdersArgs } from '../../types'

export type UpdateWorksOrderArgs = { id: string; _eTag: string } & UpdateWorksOrderModel

// args
export type GetWorksOrdersByIdArgs = {
  id: string
  embed?: 'company' | 'documents' | 'negotiator' | 'property' | 'tenancy' | 'type'
}

export type GetWorksOrderItemsArgs = {
  pageNumber?: number
  pageSize?: number
  id: string
}

// api return types

export type GetWorksOrderItemsReturn = Promise<PagedResultWorksOrderItemModel_ | UserInputError>

export type GetWorksOrdersReturn = Promise<PagedResultWorksOrderModel_ | UserInputError>
export type GetWorksOrderByIdReturn = Promise<WorksOrderModel | UserInputError>
export type CreateWorksOrderReturn = GetWorksOrderByIdReturn
export type UpdateWorksOrderReturn = GetWorksOrderByIdReturn

// resolver return types

export type QueryGetWorksOrderItemReturn = AuthenticationError | GetWorksOrderItemsReturn

export type QueryGetWorksOrdersReturn = AuthenticationError | GetWorksOrdersReturn
export type QueryGetWorksOrdersByIdReturn = AuthenticationError | GetWorksOrderByIdReturn
export type MutationCreateWorksOrder = QueryGetWorksOrdersByIdReturn
export type MutationUpdateWorksOrder = QueryGetWorksOrdersByIdReturn
