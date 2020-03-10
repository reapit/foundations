import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetContactByIdArgs,
  CreateContactArgs,
  UpdateContactArgs,
  GetContactsArgs,
  GetContactByIdReturn,
  GetContactsReturn,
  CreateContactReturn,
  UpdateContactReturn,
} from './contacts'
import errors from '../../errors'
import { API_VERSION, URLS } from '../../constants/api'

export const callGetContactByIdAPI = async (args: GetContactByIdArgs, context: ServerContext): GetContactByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetContactByIdAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${args.id}`,
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
    logger.error('callGetContactByIdAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callGetContactsAPI = async (args: GetContactsArgs, context: ServerContext): GetContactsReturn => {
  const traceId = context.traceId
  logger.info('callGetContactsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = fetcher({
      url: `${URLS.contacts}/?${params}`,
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
    logger.error('callGetContactsAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callCreateContactAPI = async (args: CreateContactArgs, context: ServerContext): CreateContactReturn => {
  const traceId = context.traceId
  logger.info('callCreateContactAPI', { traceId, args })
  try {
    const response = await fetcher({
      url: URLS.contacts,
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
    logger.error('callCreateContactAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateContactAPI = async (args: UpdateContactArgs, context: ServerContext): UpdateContactReturn => {
  const traceId = context.traceId
  logger.info('callUpdateContactAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await fetcher({
      url: `${URLS.contacts}/${args.id}`,
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
        url: `${URLS.contacts}/${args.id}`,
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
    logger.error('callUpdateContactAPI', { traceId, error: JSON.stringify(error) })
    return errors.generateUserInputError(traceId)
  }
}
