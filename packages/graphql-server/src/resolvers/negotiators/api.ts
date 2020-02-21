import { fetcher, setQueryParams } from '@reapit/elements'
import {
  NegotiatorModel,
  Negotiators,
  CreateNegotiatorModel,
  PagedResultNegotiatorModel_,
} from '@reapit/foundations-ts-definitions'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { GetNegotiatorByIdArgs, UpdateNegotiatorArgs } from './negotiator'
import errors from '../../errors'
import { API_VERSION } from '../../constants/api'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'
export const NEGOTIATORS_PER_PAGE = 10
export const URLS = {
  negotiators: '/negotiators',
}

export const callGetNegotiatorByIdAPI = async (
  args: GetNegotiatorByIdArgs,
  context: ServerContext,
): Promise<NegotiatorModel> => {
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
    logger.error('callGetNegotiatorByIdAPI', { traceId, error })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetNegotiatorsAPI = async (
  args: Negotiators,
  context: ServerContext,
): Promise<PagedResultNegotiatorModel_> => {
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
    logger.error('callGetNegotiatorsAPI', { traceId, error })
    return errors.generateUserInputError(traceId) as any
  }
}

export const callCreateNegotiatorAPI = async (
  args: CreateNegotiatorModel,
  context: ServerContext,
): Promise<NegotiatorModel> => {
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

export const callUpdateNegotiatorAPI = async (
  args: UpdateNegotiatorArgs,
  context: ServerContext,
): Promise<NegotiatorModel> => {
  const traceId = context.traceId
  try {
    logger.info('callUpdateNegotiatorAPI', { args, traceId })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    }
    await fetcher({
      url: `${URLS.negotiators}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers,
      body: args.model,
    })

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
    logger.error('callUpdateNegotiatorAPI', { traceId, error })
    return errors.generateUserInputError(traceId)
  }
}
