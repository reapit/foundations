import { ServerContext } from '@/index'
import { GetWorksOrdersReturn, GetWorksOrdersArgs } from './works-orders'

import logger from '@/logger'
import { callGetWorksOrdersByIdAPI } from './api'

export const getWorkOrders = (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('getTenancyById', { traceId, args })
  const worksOrders = callGetWorksOrdersByIdAPI(args, context)
  return worksOrders
}
