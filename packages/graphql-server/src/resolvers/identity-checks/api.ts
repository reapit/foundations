import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetIdentityCheckByIdArgs,
  CreateIdentityCheckArgs,
  UpdateIdentityCheckArgs,
  GetIdentityChecksArgs,
  GetIdentityCheckByIdReturn,
  GetIdentityChecksReturn,
  CreateIdentityCheckReturn,
  UpdateIdentityCheckReturn,
} from './identity-checks'
import errors from '../../errors'
import { API_VERSION, URLS } from '../../constants/api'

export const callGetIdentityCheckByIdAPI = async (
  args: GetIdentityCheckByIdArgs,
  context: ServerContext,
): GetIdentityCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetIdentityCheckByIdAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: `${URLS.identityChecks}/${args.id}`,
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
    logger.error('callGetIdentityCheckByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetIdentityChecksAPI = async (
  args: GetIdentityChecksArgs,
  context: ServerContext,
): GetIdentityChecksReturn => {
  const traceId = context.traceId
  logger.info('callGetIdentityChecksAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.identityChecks}/?${params}`,
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
    logger.error('callGetIdentityChecksAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateIdentityCheckAPI = async (
  args: CreateIdentityCheckArgs,
  context: ServerContext,
): CreateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('callCreateIdentityCheckAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: URLS.identityChecks,
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
    logger.error('callCreateIdentityCheckAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateIdentityCheckAPI = async (
  args: UpdateIdentityCheckArgs,
  context: ServerContext,
): UpdateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('callUpdateIdentityCheckAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await fetcher({
      url: `${URLS.identityChecks}/${args.id}`,
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
      const getResponse = await fetcher({
        url: `${URLS.identityChecks}/${args.id}`,
        api: process.env.PLATFORM_API_BASE_URL,
        method: 'GET',
        headers: {
          Authorization: context.authorization,
          'Content-Type': 'application/json',
          'api-version': API_VERSION,
        },
      })
      return getResponse
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    logger.error('callUpdateIdentityCheckAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
