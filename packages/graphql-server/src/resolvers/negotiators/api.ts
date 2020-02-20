import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetNegotiatorByIdArgs, GetNegotiatorsArgs, CreateNegotiatorArgs, UpdateNegotiatorArgs } from './negotiator'
import errors from '../../errors'
import { API_VERSION } from '../../constants/api'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'
export const NEGOTIATORS_PER_PAGE = 10
export const URLS = {
  negotiators: '/negotiators',
}

export const callGetNegotiatorByIdAPI = async (args: GetNegotiatorByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  try {
    logger.info('callGetNegotiatorByIdAPI', { traceId, args })
    const getResponse = await fetcher({
      url: `${URLS.negotiators}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: {
        Authorization: context.authorization,
        'Content-Type': 'application/json',
        'api-version': API_VERSION,
      },
    })
    return getResponse
  } catch (error) {
    logger.error('callGetNegotiatorByIdAPI', error)
    return errors.generateUserInputError(traceId)
  }
}

export const callGetNegotiatorsAPI = async (args: GetNegotiatorsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callGetNegotiatorsAPI', { args, traceId })
  try {
    const response = fetcher({
      url: `${URLS.negotiators}/?${setQueryParams({ ...args, pageSize: NEGOTIATORS_PER_PAGE })}`,
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
    logger.error('callGetContactsAPI', error)
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateNegotiatorAPI = async (args: CreateNegotiatorArgs, context: ServerContext) => {
  const traceId = context.traceId
  try {
    logger.info('callCreateNegotiatorAPI', { args, traceId })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    }
    const createResponse = await fetcher({
      url: `${URLS.negotiators}`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers,
      body: args,
    })
    return createResponse
  } catch (error) {
    logger.error('callCreateNegotiatorAPI', { traceId, error })
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateNegotiatorAPI = async (args: UpdateNegotiatorArgs, context: ServerContext) => {
  const traceId = context.traceId
  try {
    logger.info('callUpdateNegotiatorAPI', { args, traceId })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    }
    const updateResponse = await fetcher({
      url: `${URLS.negotiators}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers,
      body: args.model,
    })
    return updateResponse
  } catch (error) {
    logger.error('callUpdateNegotiatorAPI', { traceId, error })
    return errors.generateUserInputError(traceId)
  }
}
