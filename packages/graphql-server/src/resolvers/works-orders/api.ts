import {
  GetWorksOrdersArgs,
  GetWorksOrdersReturn,
  GetWorksOrdersByIdArgs,
  CreateWorksOrderArgs,
  CreateWorksOrderReturn,
  UpdateWorksOrderArgs,
  UpdateWorksOrderReturn,
} from './works-orders'
import qs from 'query-string'
import { ServerContext } from '@/index'
import logger from '@/logger'
import { createPlatformAxiosInstance } from '@/utils/axios-instances'
import { URLS } from '@/constants/api'
import { handleError } from '@/utils/handle-error'
import { getIdFromCreateHeaders } from '@/utils/get-id-from-create-headers'
import errors from '@/errors'

export const callUpdateWorksOrderAPI = async (
  args: UpdateWorksOrderArgs,
  context: ServerContext,
): UpdateWorksOrderReturn => {
  const traceId = context.traceId
  logger.info('callUpdateWorksOrderAPI', { traceId, args })
  try {
    const { _eTag, id, ...payload } = args

    const updateResponse = await createPlatformAxiosInstance().patch<UpdateWorksOrderReturn>(
      `${URLS.worksOrders}/${id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetWorksOrderByIdAPI({ id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateWorksOrderAPI' })
    return handleErrorResult
  }
}

export const callCreateWorksOrderAPI = async (
  args: CreateWorksOrderArgs,
  context: ServerContext,
): CreateWorksOrderReturn => {
  const traceId = context.traceId
  logger.info('callCreateWorksOrderAPI', { traceId, args })
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
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateWorksOrderAPI' })
    return handleErrorResult
  }
}

export const callGetWorksOrdersAPI = async (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
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
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetWorksOrdersAPI' })

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
