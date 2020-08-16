import logger from '../../logger'

import { GetWorksOrdersArgs, QueryGetWorksOrdersReturn } from './works-orders'
import { ServerContext } from '@/index'
import { checkPermission } from '@/utils/check-permission'
import errors from '@/errors'
import * as worksOrdersServices from './services'

export const queryGetWorksOrder = (
  _: any,
  args: GetWorksOrdersArgs,
  context: ServerContext,
): QueryGetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('queryGetWorksOrder', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return worksOrdersServices.getWorkOrders(args, context)
}

export default {
  Query: {
    GetWorksOrders: queryGetWorksOrder,
  },
  Mutation: {},
}
