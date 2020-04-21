import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetPropertyByIdArgs,
  CreatePropertyArgs,
  UpdatePropertyArgs,
  GetPropertiesArgs,
  GetPropertyByIdReturn,
  GetPropertiesReturn,
  CreatePropertyReturn,
  UpdatePropertyReturn,
} from './properties'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetPropertyByIdAPI = async (
  args: GetPropertyByIdArgs,
  context: ServerContext,
): GetPropertyByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetPropertyByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetPropertyByIdReturn>(`${URLS.properties}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetPropertyByIdAPI' })
  }
}

export const callGetPropertiesAPI = async (args: GetPropertiesArgs, context: ServerContext): GetPropertiesReturn => {
  const traceId = context.traceId
  logger.info('callGetPropertiesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetPropertiesReturn>(`${URLS.properties}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetPropertiesAPI' })
  }
}

export const callCreatePropertyAPI = async (args: CreatePropertyArgs, context: ServerContext): CreatePropertyReturn => {
  const traceId = context.traceId
  logger.info('callCreatePropertyAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreatePropertyReturn>(URLS.properties, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetPropertyByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    return handleError({ error, traceId, caller: 'callCreatePropertyAPI' })
  }
}

export const callUpdatePropertyAPI = async (args: UpdatePropertyArgs, context: ServerContext): UpdatePropertyReturn => {
  const traceId = context.traceId
  logger.info('callUpdatePropertyAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdatePropertyReturn>(
      `${URLS.properties}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse.status === 204) {
      return callGetPropertyByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    return handleError({ error, traceId, caller: 'callUpdatePropertyAPI' })
  }
}
