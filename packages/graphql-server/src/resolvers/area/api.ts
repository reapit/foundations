import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetAreaByIdArgs,
  GetAreaByIdReturn,
  GetAreasArgs,
  GetAreasReturn,
  CreateAreaArgs,
  CreateAreaReturn,
  UpdateAreaArgs,
  UpdateAreaReturn,
} from './area'
import errors from '../../errors'
import { API_VERSION } from '../../constants/api'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.cloud'

export const URLS = {
  areas: '/areas',
}

export const callGetAreaByIdAPI = async (args: GetAreaByIdArgs, context: ServerContext): GetAreaByIdReturn => {
  const traceId = context.traceId
  try {
    logger.info('callGetAreaByIdAPI', { traceId, args })
    const area = await fetcher({
      url: `${URLS.areas}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return area
  } catch (error) {
    logger.error('callGetAreaByIdAPI', JSON.stringify(error))
    return errors.generateUserInputError(traceId)
  }
}

export const callGetAreasAPI = async (args: GetAreasArgs, context: ServerContext): GetAreasReturn => {
  const traceId = context.traceId
  logger.info('callGetAreasAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.areas}?${params}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return response
  } catch (error) {
    logger.error('callGetAreasAPI', JSON.stringify(error))
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateAreaAPI = async (args: CreateAreaArgs, context: ServerContext): CreateAreaReturn => {
  const traceId = context.traceId
  logger.info('callCreateAreaAPI', { args, traceId })
  try {
    const response = await fetcher({
      url: `${URLS.areas}`,
      api: REAPIT_API_BASE_URL,
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
    logger.error('callCreateAreaAPI', JSON.stringify(error))
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateArea = async (args: UpdateAreaArgs, context: ServerContext): UpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('callCreateAreaAPI', { args, traceId })
  try {
    const response = await fetcher({
      url: `${URLS.areas}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
      body: args,
    })
    return response
  } catch (error) {
    logger.error('callCreateAreaAPI', JSON.stringify(error))
    return errors.generateUserInputError(traceId)
  }
}
