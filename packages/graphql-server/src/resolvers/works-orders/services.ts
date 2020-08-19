import { ServerContext } from '@/index'
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

import logger from '@/logger'
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
  const traceId = context.traceId

  logger.info('updateWorksOrderItem', { traceId, args })

  const worksOrder = callUpdateWorksOrderItemAPI(args, context)
  return worksOrder
}

export const deleteWorksOrderItem = (
  args: DeleteWorksOrderItemArgs,
  context: ServerContext,
): DeleteWorksOrderItemReturn => {
  const traceId = context.traceId

  logger.info('deleteWorksOrderItem', { traceId, args })

  return calldeleteWorksOrderItem(args, context)
}

export const createWorksOrderItem = (
  args: CreateWorksOrderItemArgs,
  context: ServerContext,
): MutationCreateWorksOrderItemReturn => {
  const traceId = context.traceId
  /*
   * TODOME()
   * rename
   */

  logger.info('createWorksOrderItem', { traceId, args })
  /*
   * TODOME()
   * rename API
   */

  const worksOrder = callCreateWorksOrderItemAPI(args, context)
  return worksOrder
}

export const getWorksOrderItemById = (
  args: GetWorksOrderItembyIdArgs,
  context: ServerContext,
): GetWorksOrderItemByIdReturn => {
  const traceId = context.traceId

  logger.info('getWorksOrderItemById', { traceId, args })

  const worksOrder = callGetWorksOrderItemByIdAPI(args, context)
  return worksOrder
}

export const getWorksOrderItems = (args: GetWorksOrderItemsArgs, context: ServerContext): GetWorksOrderItemsReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrderItems', { traceId, args })
  const worksOrderItems = callGetWorksOrderItemsAPI(args, context)
  return worksOrderItems
}

export const updateWorksOrder = (args: UpdateWorksOrderArgs, context: ServerContext): UpdateWorksOrderReturn => {
  const traceId = context.traceId
  logger.info('updateWorksOrder', { traceId, args })
  const worksOrder = callUpdateWorksOrderAPI(args, context)
  return worksOrder
}

export const createWorksOrder = (args: CreateWorksOrderArgs, context: ServerContext): CreateWorksOrderReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrders', { traceId, args })
  const worksOrder = callCreateWorksOrderdAPI(args, context)
  return worksOrder
}

export const getWorksOrders = (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrders', { traceId, args })
  const worksOrders = callGetWorksOrdersAPI(args, context)
  return worksOrders
}

export const getWorkOrderById = (args: GetWorksOrdersByIdArgs, context: ServerContext): GetWorksOrderByIdReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrdersById', { traceId, args })
  const worksOrder = callGetWorksOrderByIdAPI(args, context)
  return worksOrder
}
