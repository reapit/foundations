import { ServerContext } from '@/index'
import {
  GetWorksOrdersReturn,
  GetWorksOrdersArgs,
  GetWorksOrderByIdReturn,
  GetWorksOrdersByIdArgs,
} from './works-orders'

import logger from '@/logger'
import { callGetWorksOrderByIdAPI, callGetWorksOrders } from './api'

export const getWorkOrders = (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('getWorkOrders', { traceId, args })
  const worksOrders = callGetWorksOrders(args, context)
  return worksOrders
}

export const getWorkOrderById = (args: GetWorksOrdersByIdArgs, context: ServerContext): GetWorksOrderByIdReturn => {
  const traceId = context.traceId
  logger.info('getWorkOrdersById', { traceId, args })
  const worksOrders = callGetWorksOrderByIdAPI(args, context)
  return worksOrders
}
