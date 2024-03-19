import {
  GetWorksOrdersArgs,
  GetWorksOrdersReturn,
  GetWorksOrdersByIdArgs,
  CreateWorksOrderArgs,
  CreateWorksOrderReturn,
  UpdateWorksOrderArgs,
  UpdateWorksOrderReturn,
  GetWorksOrderItemsArgs,
  GetWorksOrderItemsReturn,
  GetWorksOrderItembyIdArgs,
  GetWorksOrderItemByIdReturn,
  CreateWorksOrderItemArgs,
  CreateWorksOrderItemReturn,
  UpdateWorksOrderItemArgs,
  UpdateWorksOrderItemReturn,
  DeleteWorksOrderItemReturn,
  DeleteWorksOrderItemArgs,
} from './works-orders'
import qs from 'query-string'
import { ServerContext } from '../../utils'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { URLS } from '../../constants/api'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'
import errors from '../../errors'

export const calldeleteWorksOrderItem = async (
  args: DeleteWorksOrderItemArgs,
  context: ServerContext,
): DeleteWorksOrderItemReturn => {
  const traceId = context.traceId
  try {
    const { id, itemId } = args

    await createPlatformAxiosInstance().delete<DeleteWorksOrderItemReturn>(
      `${URLS.worksOrders}/${id}/items/${itemId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return true
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'calldeleteWorksOrderItem' })
    return handleErrorResult
  }
}

export const callUpdateWorksOrderItemAPI = async (
  args: UpdateWorksOrderItemArgs,
  context: ServerContext,
): UpdateWorksOrderItemReturn => {
  const traceId = context.traceId
  try {
    const { _eTag, id, itemId, ...payload } = args

    const updateResponse = await createPlatformAxiosInstance().patch<UpdateWorksOrderReturn>(
      `${URLS.worksOrders}/${id}/items/${itemId}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetWorksOrderItemByIdAPI({ id, itemId }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateWorksOrderItem' })
    return handleErrorResult
  }
}

export const callCreateWorksOrderItemAPI = async (
  args: CreateWorksOrderItemArgs,
  context: ServerContext,
): CreateWorksOrderItemReturn => {
  const traceId = context.traceId

  try {
    const { id } = args
    const response = await createPlatformAxiosInstance().post<GetWorksOrdersReturn>(
      `${URLS.worksOrders}/${id}/items`,
      args,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )

    const createdWorksOrderItemId = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetWorksOrderItemByIdAPI({ id, itemId: createdWorksOrderItemId }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateWorksOrderItemAPI' })

    return handleErrorResult
  }
}

export const callGetWorksOrderItemByIdAPI = async (
  args: GetWorksOrderItembyIdArgs,
  context: ServerContext,
): GetWorksOrderItemByIdReturn => {
  const traceId = context.traceId

  const { id, itemId } = args

  try {
    const response = await createPlatformAxiosInstance().get<GetWorksOrdersReturn>(
      `${URLS.worksOrders}/${id}/items/${itemId}`,
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

export const callGetWorksOrderItemsAPI = async (
  args: GetWorksOrderItemsArgs,
  context: ServerContext,
): GetWorksOrderItemsReturn => {
  const traceId = context.traceId

  const { id } = args

  try {
    const response = await createPlatformAxiosInstance().get<GetWorksOrdersReturn>(`${URLS.worksOrders}/${id}/items`, {
      headers: {
        Authorization: context.authorization,
      },
    })

    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetWorksOrderItemsAPI' })

    return handleErrorResult
  }
}

export const callUpdateWorksOrderAPI = async (
  args: UpdateWorksOrderArgs,
  context: ServerContext,
): UpdateWorksOrderReturn => {
  const traceId = context.traceId
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
    console.log({ error: error.response })

    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateWorksOrderAPI' })
    return handleErrorResult
  }
}

export const callCreateWorksOrderdAPI = async (
  args: CreateWorksOrderArgs,
  context: ServerContext,
): CreateWorksOrderReturn => {
  const traceId = context.traceId
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
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateWorksOrderdAPI' })
    return handleErrorResult
  }
}

export const callGetWorksOrdersAPI = async (args: GetWorksOrdersArgs, context: ServerContext): GetWorksOrdersReturn => {
  const traceId = context.traceId
  try {
    const params = qs.stringify(args as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetWorksOrdersReturn>(`${URLS.worksOrders}?${params}`, {
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

  const { id, ...paramsObj } = args
  const params = qs.stringify(paramsObj as Record<string, string>)

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
