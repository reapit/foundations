import { fetcher } from '@reapit/elements'
import qs from 'query-string'
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
import { API_VERSION, URLS } from '../../constants/api'

export const callGetNegotiatorByIdAPI = async (
  args: GetNegotiatorByIdArgs,
  context: ServerContext,
): GetNegotiatorByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetNegotiatorByIdAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: `${URLS.negotiators}/${args.id}`,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callGetNegotiatorByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetNegotiatorsAPI = async (args: GetNegotiatorsArgs, context: ServerContext): GetNegotiatorsReturn => {
  const traceId = context.traceId
  logger.info('callGetNegotiatorsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.negotiators}/?${params}`,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callGetNegotiatorsAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateNegotiatorAPI = async (
  args: CreateNegotiatorArgs,
  context: ServerContext,
): CreateNegotiatorReturn => {
  const traceId = context.traceId
  logger.info('callCreateNegotiatorAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: URLS.negotiators,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'POST',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
      body: args,
    })
    return response
  } catch (error) {
    logger.error('callCreateNegotiatorAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
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
    const updateResponse = await fetcher({
      url: `${URLS.negotiators}/${args.id}`,
      api: process.env.PLATFORM_API_BASE_URL,
      method: 'PATCH',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
        'If-Match': _eTag,
      },
      body: payload,
    })

    if (updateResponse) {
      return callGetNegotiatorByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    logger.error('callUpdateNegotiatorAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
