import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
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
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetIdentityCheckByIdAPI = async (
  args: GetIdentityCheckByIdArgs,
  context: ServerContext,
): GetIdentityCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetIdentityCheckByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest)
    const response = await createPlatformAxiosInstance().get<GetIdentityCheckByIdReturn>(
      `${URLS.identityChecks}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetIdentityCheckByIdAPI' })
    return handleErrorResult
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
    const response = await createPlatformAxiosInstance().get<GetIdentityChecksReturn>(
      `${URLS.identityChecks}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetIdentityChecksAPI' })
    return handleErrorResult
  }
}

export const callCreateIdentityCheckAPI = async (
  args: CreateIdentityCheckArgs,
  context: ServerContext,
): CreateIdentityCheckReturn => {
  const traceId = context.traceId
  logger.info('callCreateIdentityCheckAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateIdentityCheckReturn>(URLS.identityChecks, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetIdentityCheckByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateIdentityCheckAPI' })
    return handleErrorResult
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
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateIdentityCheckReturn>(
      `${URLS.identityChecks}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetIdentityCheckByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateIdentityCheckAPI' })
    return handleErrorResult
  }
}
