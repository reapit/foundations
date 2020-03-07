import { fetcher } from '@reapit/elements'
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
import { API_VERSION, URLS } from '../../constants/api'

export const callGetAreaByIdAPI = async (args: GetAreaByIdArgs, context: ServerContext): GetAreaByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetAreaByIdAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: `${URLS.areas}/${args.id}`,
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
    logger.error('callGetAreaByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetAreasAPI = async (args: GetAreasArgs, context: ServerContext): GetAreasReturn => {
  const traceId = context.traceId
  logger.info('callGetAreasAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.areas}/?${params}`,
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
    logger.error('callGetAreasAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateAreaAPI = async (args: CreateAreaArgs, context: ServerContext): CreateAreaReturn => {
  const traceId = context.traceId
  logger.info('callCreateAreaAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: URLS.areas,
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
    logger.error('callCreateAreaAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateAreaAPI = async (args: UpdateAreaArgs, context: ServerContext): UpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('callUpdateAreaAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const response = await fetcher({
      url: `${URLS.areas}/${args.id}`,
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
    return response
  } catch (error) {
    logger.error('callUpdateAreaAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
