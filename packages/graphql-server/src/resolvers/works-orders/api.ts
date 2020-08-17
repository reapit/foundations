import {
  GetWorksOrdersArgs,
  GetWorksOrdersReturn,
  GetWorksOrdersByIdArgs,
  CreateWorksOrderArgs,
  CreateWorksOrderReturn,
} from './works-orders'
import qs from 'query-string'
import { ServerContext } from '@/index'
import logger from '@/logger'
import { createPlatformAxiosInstance } from '@/utils/axios-instances'
import { URLS } from '@/constants/api'
import { handleError } from '@/utils/handle-error'
import { getIdFromCreateHeaders } from '@/utils/get-id-from-create-headers'

export const callCreateWorksOrder = async (
  args: CreateWorksOrderArgs,
  context: ServerContext,
): CreateWorksOrderReturn => {
  const traceId = context.traceId
  logger.info('callCreateWorksOrder', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateWorksOrderReturn>(URLS.worksOrders, args, {
      headers: {
        Authorization: context.authorization,
      },
    })

    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetWorksOrderByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    console.log({ error })

    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateWorksOrder' })
    return handleErrorResult
  }
}

export const callGetWorksOrders = async (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('callGetWorksOrderByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetWorksOrdersReturn>(`${URLS.worksOrders}`, {
      headers: {
        Authorization: context.authorization,
      },
    })

    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetWorksOrders' })

    return handleErrorResult
  }
}

export const callGetWorksOrderByIdAPI = async (
  args: GetWorksOrdersByIdArgs,
  context: ServerContext,
): GetWorksOrdersReturn => {
  const traceId = context.traceId
  logger.info('callGetWorksOrderByIdAPI', { traceId, args })

  const { id, ...paramsObj } = args
  const params = qs.stringify(paramsObj)

  try {
    const response = await createPlatformAxiosInstance().get<GetWorksOrdersReturn>(
      `${URLS.worksOrders}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )

    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetWorksOrderByIdAPI' })

    return handleErrorResult
  }
}
