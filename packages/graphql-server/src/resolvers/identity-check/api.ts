import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
import errors from '../../errors'
import { API_VERSION } from '../../constants/api'
import { callGetContactByIdAPI } from '../contact/api'
import {
  GetIdentityChecksArgs,
  GetIdentityCheckByIdArgs,
  CreateIdentityCheckArgs,
  UpdateIdentityCheckArgs,
  GetIdentityCheckByIdReturn,
  GetIdentityChecksReturn,
  CreateIdentityCheckReturn,
  UpdateIdentityCheckReturn,
} from './identity-check'

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.cloud'

export const URLS = {
  identityChecks: '/identityChecks',
}

export const callGetIdentityChecksAPI = async (
  args: GetIdentityChecksArgs,
  context: ServerContext,
): GetIdentityChecksReturn => {
  const traceId = context.traceId
  try {
    logger.info('callGetIdentityChecksAPI', { traceId, args })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    }
    const paramsUrl = qs.stringify(args)
    const url = `${URLS.identityChecks}?${paramsUrl}`
    const response = await fetcher({
      url,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers,
      body: {},
    })
    return response
  } catch (error) {
    logger.error('callGetIdentityChecksAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetIdentityCheckByIdAPI = async (
  args: GetIdentityCheckByIdArgs,
  context: ServerContext,
): GetIdentityCheckByIdReturn => {
  const traceId = context.traceId
  try {
    logger.info('callGetIdentityCheckByIdAPI', { traceId, args })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    }
    const response = await fetcher({
      url: `${URLS.identityChecks}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers,
      body: {},
    })
    return response
  } catch (error) {
    logger.error('callGetIdentityCheckByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateIdentityCheckAPI = async (
  args: CreateIdentityCheckArgs,
  context: ServerContext,
): CreateIdentityCheckReturn => {
  const traceId = context.traceId
  try {
    logger.info('callCreateIdentityCheckAPI', { traceId, args })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    }
    const createResponse = await fetcher({
      url: `${URLS.identityChecks}`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers,
      body: args,
    })
    return createResponse
    // TODO this one will be replace when BE return id of the new identityCheck
    // if (createResponse) {
    //   const response = await callGetContactByIdAPI({ id: '1' }, context)
    //   return response
    // }
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
  try {
    logger.info('callUpdateIdentityCheckAPI', { traceId, args })
    const headers = {
      Authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
      'If-Match': args._eTag,
    }
    const updateResponse = await fetcher({
      url: `${URLS.identityChecks}/${args.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers,
      body: args,
    })
    if (updateResponse) {
      const fetchResponse = await callGetContactByIdAPI({ id: args.id }, context)
      return fetchResponse
    }
  } catch (error) {
    logger.error('callUpdateIdentityCheckAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
