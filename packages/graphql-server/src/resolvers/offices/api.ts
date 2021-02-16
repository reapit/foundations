import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetOfficeByIdArgs,
  CreateOfficeArgs,
  UpdateOfficeArgs,
  GetOfficesArgs,
  GetOfficeByIdReturn,
  GetOfficesReturn,
  CreateOfficeReturn,
  UpdateOfficeReturn,
} from './offices'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetOfficeByIdAPI = async (args: GetOfficeByIdArgs, context: ServerContext): GetOfficeByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetOfficeByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetOfficeByIdReturn>(`${URLS.offices}/${id}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetOfficeByIdAPI' })
    return handleErrorResult
  }
}

export const callGetOfficesAPI = async (args: GetOfficesArgs, context: ServerContext): GetOfficesReturn => {
  const traceId = context.traceId
  logger.info('callGetOfficesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetOfficesReturn>(`${URLS.offices}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetOfficesAPI' })
    return handleErrorResult
  }
}

export const callCreateOfficeAPI = async (args: CreateOfficeArgs, context: ServerContext): CreateOfficeReturn => {
  const traceId = context.traceId
  logger.info('callCreateOfficeAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateOfficeReturn>(URLS.offices, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetOfficeByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateOfficeAPI' })
    return handleErrorResult
  }
}

export const callUpdateOfficeAPI = async (args: UpdateOfficeArgs, context: ServerContext): UpdateOfficeReturn => {
  const traceId = context.traceId
  logger.info('callUpdateOfficeAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateOfficeReturn>(
      `${URLS.offices}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse.status === 204) {
      return callGetOfficeByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateOfficeAPI' })
    return handleErrorResult
  }
}
