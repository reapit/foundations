import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  GetSourceByIdArgs,
  CreateSourceArgs,
  UpdateSourceArgs,
  GetSourcesArgs,
  GetSourceByIdReturn,
  GetSourcesReturn,
  CreateSourceReturn,
  UpdateSourceReturn,
} from './sources'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetSourceByIdAPI = async (args: GetSourceByIdArgs, context: ServerContext): GetSourceByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetSourceByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetSourceByIdReturn>(`${URLS.sources}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetSourceByIdAPI' })
    return handleErrorResult
  }
}

export const callGetSourcesAPI = async (args: GetSourcesArgs, context: ServerContext): GetSourcesReturn => {
  const traceId = context.traceId
  logger.info('callGetSourcesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetSourcesReturn>(`${URLS.sources}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    logger.info('callGetSourcesAPIERRRPR', response)

    return response?.data
  } catch (error) {
    logger.info('callGetSourcesAPIERRRPR', error)

    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetSourcesAPI' })
    return handleErrorResult
  }
}

export const callCreateSourceAPI = async (args: CreateSourceArgs, context: ServerContext): CreateSourceReturn => {
  const traceId = context.traceId
  logger.info('callCreateSourceAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateSourceReturn>(URLS.sources, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetSourceByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateSourceAPI' })
    return handleErrorResult
  }
}

export const callUpdateSourceAPI = async (args: UpdateSourceArgs, context: ServerContext): UpdateSourceReturn => {
  const traceId = context.traceId
  logger.info('callUpdateSourceAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateSourceReturn>(
      `${URLS.sources}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetSourceByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateSourceAPI' })
    return handleErrorResult
  }
}
