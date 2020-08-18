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
} from './works-orders'

import logger from '@/logger'
import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderByIdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
} from './api'

export const getWorksOrderItems = (args: GetWorksOrderItemsArgs, context: ServerContext): GetWorksOrderItemsReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrderItems', { traceId, args })
  const worksOrder = callGetWorksOrderItemsAPI(args, context)
  return worksOrder
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
  const worksOrder = callCreateWorksOrderByIdAPI(args, context)
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
