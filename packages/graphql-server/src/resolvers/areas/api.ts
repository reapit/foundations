import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetAreaByIdArgs,
  CreateAreaArgs,
  UpdateAreaArgs,
  GetAreasArgs,
  GetAreaByIdReturn,
  GetAreasReturn,
  CreateAreaReturn,
  UpdateAreaReturn,
} from './areas'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetAreaByIdAPI = async (args: GetAreaByIdArgs, context: ServerContext): GetAreaByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetAreaByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetAreaByIdReturn>(`${URLS.areas}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetAreaByIdAPI' })
  }
}

export const callGetAreasAPI = async (args: GetAreasArgs, context: ServerContext): GetAreasReturn => {
  const traceId = context.traceId
  logger.info('callGetAreasAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetAreasReturn>(`${URLS.areas}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetAreasAPI' })
  }
}

export const callCreateAreaAPI = async (args: CreateAreaArgs, context: ServerContext): CreateAreaReturn => {
  const traceId = context.traceId
  logger.info('callCreateAreaAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateAreaReturn>(URLS.areas, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetAreaByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    return handleError({ error, traceId, caller: 'callCreateAreaAPI' })
  }
}

export const callUpdateAreaAPI = async (args: UpdateAreaArgs, context: ServerContext): UpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('callUpdateAreaAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateAreaReturn>(
      `${URLS.areas}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse?.data) {
      return callGetAreaByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    return handleError({ error, traceId, caller: 'callUpdateAreaAPI' })
  }
}
