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
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetContactByIdAPI = async (args: GetContactByIdArgs, context: ServerContext): GetContactByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetContactByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetContactByIdReturn>(`${URLS.contacts}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetContactByIdAPI' })
  }
}

export const callGetContactsAPI = async (args: GetContactsArgs, context: ServerContext): GetContactsReturn => {
  const traceId = context.traceId
  logger.info('callGetContactsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetContactsReturn>(`${URLS.contacts}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callGetContactsAPI' })
  }
}

export const callCreateContactAPI = async (args: CreateContactArgs, context: ServerContext): CreateContactReturn => {
  const traceId = context.traceId
  logger.info('callCreateContactAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateContactReturn>(URLS.contacts, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    return handleError({ error, traceId, caller: 'callCreateContactAPI' })
  }
}

export const callUpdateContactAPI = async (args: UpdateContactArgs, context: ServerContext): UpdateContactReturn => {
  const traceId = context.traceId
  logger.info('callUpdateContactAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateContactReturn>(
      `${URLS.contacts}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse?.data) {
      return callGetContactByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    return handleError({ error, traceId, caller: 'callUpdateContactAPI' })
  }
}
