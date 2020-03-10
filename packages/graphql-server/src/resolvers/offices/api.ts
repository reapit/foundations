import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
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
import { API_VERSION, URLS } from '../../constants/api'

export const callGetOfficeByIdAPI = async (args: GetOfficeByIdArgs, context: ServerContext): GetOfficeByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetOfficeByIdAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: `${URLS.offices}/${args.id}`,
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
    logger.error('callGetOfficeByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetOfficesAPI = async (args: GetOfficesArgs, context: ServerContext): GetOfficesReturn => {
  const traceId = context.traceId
  logger.info('callGetOfficesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.offices}/?${params}`,
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
    logger.error('callGetOfficesAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateOfficeAPI = async (args: CreateOfficeArgs, context: ServerContext): CreateOfficeReturn => {
  const traceId = context.traceId
  logger.info('callCreateOfficeAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: URLS.offices,
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
    logger.error('callCreateOfficeAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateOfficeAPI = async (args: UpdateOfficeArgs, context: ServerContext): UpdateOfficeReturn => {
  const traceId = context.traceId
  logger.info('callUpdateOfficeAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await fetcher({
      url: `${URLS.offices}/${args.id}`,
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
      return callGetOfficeByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    logger.error('callUpdateOfficeAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
