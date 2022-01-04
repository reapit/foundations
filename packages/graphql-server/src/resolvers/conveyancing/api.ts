import qs from 'query-string'
import { ServerContext } from '../../utils'
import {
  GetConveyancingByIdArgs,
  UpdateConveyancingArgs,
  GetConveyancingArgs,
  GetConveyancingByIdReturn,
  GetConveyancingReturn,
  UpdateConveyancingReturn,
  GetConveyancingChainArgs,
  GetConveyancingChainReturn,
  DeleteDownwardLinkModelArgs,
  DeleteDownwardLinkModelReturn,
  DeleteUpwardLinkModelArgs,
  DeleteUpwardLinkModelReturn,
  CreateDownwardLinkModelArgs,
  CreateDownwardLinkModelReturn,
  CreateUpwardLinkModelArgs,
  CreateUpwardLinkModelReturn,
} from './conveyancing'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetConveyancingByIdAPI = async (
  args: GetConveyancingByIdArgs,
  context: ServerContext,
): GetConveyancingByIdReturn => {
  const traceId = context.traceId
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetConveyancingByIdReturn>(
      `${URLS.conveyancing}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetConveyancingByIdAPI' })
    return handleErrorResult
  }
}

export const callGetConveyancingAPI = async (
  args: GetConveyancingArgs,
  context: ServerContext,
): GetConveyancingReturn => {
  const traceId = context.traceId
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetConveyancingReturn>(`${URLS.conveyancing}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetConveyancingAPI' })
    return handleErrorResult
  }
}

export const callGetConveyancingChainAPI = async (
  args: GetConveyancingChainArgs,
  context: ServerContext,
): GetConveyancingChainReturn => {
  const traceId = context.traceId
  try {
    const response = await createPlatformAxiosInstance().get<GetConveyancingChainReturn>(
      `${URLS.conveyancing}/${args.id}/chain`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetConveyancingChainAPI' })
    return handleErrorResult
  }
}

export const callUpdateConveyancingAPI = async (
  args: UpdateConveyancingArgs,
  context: ServerContext,
): UpdateConveyancingReturn => {
  const traceId = context.traceId
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateConveyancingReturn>(
      `${URLS.conveyancing}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse.status === 204) {
      return callGetConveyancingByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateConveyancingAPI' })
    return handleErrorResult
  }
}

export const callCreateDownwardLinkModelAPI = async (
  args: CreateDownwardLinkModelArgs,
  context: ServerContext,
): CreateDownwardLinkModelReturn => {
  const traceId = context.traceId
  try {
    const { id, ...payload } = args
    await createPlatformAxiosInstance().post<CreateDownwardLinkModelReturn>(
      `${URLS.conveyancing}/${id}/downward`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return callGetConveyancingByIdAPI({ id }, context)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateDownwardLinkModelAPI' })
    return handleErrorResult
  }
}

export const callDeleteDownwardLinkModelAPI = async (
  args: DeleteDownwardLinkModelArgs,
  context: ServerContext,
): DeleteDownwardLinkModelReturn => {
  const traceId = context.traceId
  try {
    await createPlatformAxiosInstance().delete<DeleteDownwardLinkModelReturn>(
      `${URLS.conveyancing}/${args.id}/downward`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return args.id
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteDownwardLinkModelAPI' })
    return handleErrorResult
  }
}

export const callCreateUpwardLinkModelAPI = async (
  args: CreateUpwardLinkModelArgs,
  context: ServerContext,
): CreateUpwardLinkModelReturn => {
  const traceId = context.traceId
  try {
    const { id, ...payload } = args
    await createPlatformAxiosInstance().post<CreateUpwardLinkModelReturn>(
      `${URLS.conveyancing}/${id}/upward`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return callGetConveyancingByIdAPI({ id }, context)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateUpwardLinkModelAPI' })
    return handleErrorResult
  }
}

export const callDeleteUpwardLinkModelAPI = async (
  args: DeleteUpwardLinkModelArgs,
  context: ServerContext,
): DeleteUpwardLinkModelReturn => {
  const traceId = context.traceId
  try {
    await createPlatformAxiosInstance().delete<DeleteUpwardLinkModelReturn>(`${URLS.conveyancing}/${args.id}/upward`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return args.id
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteUpwardLinkModelAPI' })
    return handleErrorResult
  }
}
