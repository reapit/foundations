import { GetWorksOrdersArgs, GetWorksOrdersReturn } from './works-orders'
import { ServerContext } from '@/index'
import logger from '@/logger'
import { createPlatformAxiosInstance } from '@/utils/axios-instances'
import { URLS } from '@/constants/api'
import { handleError } from '@/utils/handle-error'

export const callGetWorksOrdersByIdAPI = async (
  args: GetWorksOrdersArgs,
  context: ServerContext,
): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('callGetWorksOrdersByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetWorksOrdersReturn>(`${URLS.worksOrders}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    console.log({ response })

    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetWorksOrdersByIdAPI' })

    return handleErrorResult
  }
}
