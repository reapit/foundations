import qs from 'query-string'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetNegotiatorByIdArgs,
  CreateNegotiatorArgs,
  UpdateNegotiatorArgs,
  GetNegotiatorsArgs,
  GetNegotiatorByIdReturn,
  GetNegotiatorsReturn,
  CreateNegotiatorReturn,
  UpdateNegotiatorReturn,
} from './negotiators'
import errors from '../../errors'
import { handleError } from '../../utils/handle-error'
import { URLS } from '../../constants/api'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetNegotiatorByIdAPI = async (
  args: GetNegotiatorByIdArgs,
  context: ServerContext,
): GetNegotiatorByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetNegotiatorByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest)
    const response = await createPlatformAxiosInstance().get<GetNegotiatorByIdReturn>(
      `${URLS.negotiators}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetNegotiatorByIdAPI' })
  }
}

export const callGetNegotiatorsAPI = async (args: GetNegotiatorsArgs, context: ServerContext): GetNegotiatorsReturn => {
  const traceId = context.traceId
  logger.info('callGetNegotiatorsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetNegotiatorsReturn>(`${URLS.negotiators}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    console.log(error)
    return handleError({ error, traceId, caller: 'callGetNegotiatorsAPI' })
  }
}

export const callCreateNegotiatorAPI = async (
  args: CreateNegotiatorArgs,
  context: ServerContext,
): CreateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('callCreateNegotiatorAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateNegotiatorReturn>(URLS.negotiators, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetNegotiatorByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    return handleError({ error, traceId, caller: 'callCreateNegotiatorAPI' })
  }
}

export const callUpdateNegotiatorAPI = async (
  args: UpdateNegotiatorArgs,
  context: ServerContext,
): UpdateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('callUpdateNegotiatorAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<CreateNegotiatorReturn>(
      `${URLS.negotiators}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetNegotiatorByIdAPI({ id: args.id, embed: ['office'] }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    return handleError({ error, traceId, caller: 'callUpdateNegotiatorAPI' })
  }
}
