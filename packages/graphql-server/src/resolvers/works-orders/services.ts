import { ServerContext } from '@/index'
import {
  GetWorksOrdersReturn,
  GetWorksOrdersArgs,
  GetWorksOrderByIdReturn,
  GetWorksOrdersByIdArgs,
  CreateWorksOrderArgs,
  CreateWorksOrderReturn,
} from './works-orders'

import logger from '@/logger'
import { callGetWorksOrderByIdAPI, callGetWorksOrders, callCreateWorksOrder } from './api'

export const createWorksOrder = (args: CreateWorksOrderArgs, context: ServerContext): CreateWorksOrderReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrders', { traceId, args })
  const worksOrders = callCreateWorksOrder(args, context)
  return worksOrders
}

export const getWorksOrders = (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrders', { traceId, args })
  const worksOrders = callGetWorksOrders(args, context)
  return worksOrders
}

export const getWorkOrderById = (args: GetWorksOrdersByIdArgs, context: ServerContext): GetWorksOrderByIdReturn => {
  const traceId = context.traceId
  logger.info('getWorksOrdersById', { traceId, args })
  const worksOrders = callGetWorksOrderByIdAPI(args, context)
  return worksOrders
}
