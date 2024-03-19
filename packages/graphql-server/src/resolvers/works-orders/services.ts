import { ServerContext } from '../../utils'
import {
  GetWorksOrdersReturn,
  GetWorksOrdersArgs,
  GetWorksOrderByIdReturn,
  GetWorksOrdersByIdArgs,
  CreateWorksOrderArgs,
  CreateWorksOrderReturn,
  UpdateWorksOrderArgs,
  UpdateWorksOrderReturn,
  GetWorksOrderItemsArgs,
  GetWorksOrderItemsReturn,
  GetWorksOrderItemByIdReturn,
  GetWorksOrderItembyIdArgs,
  UpdateWorksOrderItemArgs,
  CreateWorksOrderItemArgs,
  MutationCreateWorksOrderItemReturn,
  DeleteWorksOrderItemArgs,
  DeleteWorksOrderItemReturn,
} from './works-orders'
import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
  callGetWorksOrderItemByIdAPI,
  callCreateWorksOrderItemAPI,
  callUpdateWorksOrderItemAPI,
  calldeleteWorksOrderItem,
} from './api'

export const updateWorksOrderItem = (
  args: UpdateWorksOrderItemArgs,
  context: ServerContext,
): UpdateWorksOrderReturn => {
  const worksOrder = callUpdateWorksOrderItemAPI(args, context)
  return worksOrder
}

export const deleteWorksOrderItem = (
  args: DeleteWorksOrderItemArgs,
  context: ServerContext,
): DeleteWorksOrderItemReturn => {
  return calldeleteWorksOrderItem(args, context)
}

export const createWorksOrderItem = (
  args: CreateWorksOrderItemArgs,
  context: ServerContext,
): MutationCreateWorksOrderItemReturn => {
  const worksOrder = callCreateWorksOrderItemAPI(args, context)
  return worksOrder
}

export const getWorksOrderItemById = (
  args: GetWorksOrderItembyIdArgs,
  context: ServerContext,
): GetWorksOrderItemByIdReturn => {
  const worksOrder = callGetWorksOrderItemByIdAPI(args, context)
  return worksOrder
}

export const getWorksOrderItems = (args: GetWorksOrderItemsArgs, context: ServerContext): GetWorksOrderItemsReturn => {
  const worksOrderItems = callGetWorksOrderItemsAPI(args, context)
  return worksOrderItems
}

export const updateWorksOrder = (args: UpdateWorksOrderArgs, context: ServerContext): UpdateWorksOrderReturn => {
  const worksOrder = callUpdateWorksOrderAPI(args, context)
  return worksOrder
}

export const createWorksOrder = (args: CreateWorksOrderArgs, context: ServerContext): CreateWorksOrderReturn => {
  const worksOrder = callCreateWorksOrderdAPI(args, context)
  return worksOrder
}

export const getWorksOrders = (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const worksOrders = callGetWorksOrdersAPI(args, context)
  return worksOrders
}

export const getWorkOrderById = (args: GetWorksOrdersByIdArgs, context: ServerContext): GetWorksOrderByIdReturn => {
  const worksOrder = callGetWorksOrderByIdAPI(args, context)
  return worksOrder
}
