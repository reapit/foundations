import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetLandlordByIdArgs,
  GetLandlordByIdReturn,
  GetLandlordsArgs,
  GetLandlordsReturn,
  GetLandlordRelationshipsArgs,
  GetLandlordRelationshipsReturn,
  GetLandlordRelationshipByIdArgs,
  GetLandlordRelationshipByIdReturn,
  CreateLandlordArgs,
  CreateLandlordReturn,
  CreateLandlordRelationshipArgs,
  CreateLandlordRelationshipReturn,
  DeleteLandlordRelationshipArgs,
  DeleteLandlordRelationshipReturn,
  UpdateLandlordArgs,
  UpdateLandlordReturn,
} from './landlords'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetLandlordByIdAPI = async (
  args: GetLandlordByIdArgs,
  context: ServerContext,
): GetLandlordByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetLandlordByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetLandlordByIdReturn>(
      `${URLS.landlords}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetLandlordByIdAPI' })

    return handleErrorResult
  }
}

export const callGetLandlordsAPI = async (args: GetLandlordsArgs, context: ServerContext): GetLandlordsReturn => {
  const traceId = context.traceId
  logger.info('callGetLandlordsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetLandlordsReturn>(`${URLS.landlords}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetLanlordsAPI' })
    return handleErrorResult
  }
}

export const callGetLandlordRelationshipsAPI = async (
  args: GetLandlordRelationshipsArgs,
  context: ServerContext,
): GetLandlordRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('callGetLandlordRelationshipsAPI', { args, traceId })
  try {
    const { id, ...paramsObj } = args
    const params = qs.stringify(paramsObj as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetLandlordRelationshipsReturn>(
      `${URLS.landlords}/${id}/relationships?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetLandlordRelationshipsAPI' })
    return handleErrorResult
  }
}

export const callGetLandlordRelationshipByIdAPI = async (
  args: GetLandlordRelationshipByIdArgs,
  context: ServerContext,
): GetLandlordRelationshipByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetLandlordRelationshipByIdAPI', { args, traceId })
  try {
    const { id, relationshipId } = args
    const response = await createPlatformAxiosInstance().get<GetLandlordRelationshipByIdReturn>(
      `${URLS.landlords}/${id}/relationships/${relationshipId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetLandlordRelationshipByIdAPI' })
    return handleErrorResult
  }
}

export const callCreateLandlordAPI = async (args: CreateLandlordArgs, context: ServerContext): CreateLandlordReturn => {
  const traceId = context.traceId
  logger.info('callCreateLandlordAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateLandlordReturn>(URLS.landlords, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetLandlordByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateLandlordAPI' })
    return handleErrorResult
  }
}

export const callCreateLandlordRelationshipAPI = async (
  args: CreateLandlordRelationshipArgs,
  context: ServerContext,
): CreateLandlordRelationshipReturn => {
  const traceId = context.traceId
  logger.info('callCreateLandlordRelationshipAPI', { traceId, args })
  try {
    const { id, ...payload } = args
    await createPlatformAxiosInstance().post<CreateLandlordRelationshipReturn>(
      `${URLS.landlords}/${id}/relationships`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return callGetLandlordRelationshipsAPI({ id }, context)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateLandlordRelationshipAPI' })
    return handleErrorResult
  }
}

export const callDeleteLandlordRelationshipAPI = async (
  args: DeleteLandlordRelationshipArgs,
  context: ServerContext,
): DeleteLandlordRelationshipReturn => {
  const traceId = context.traceId
  logger.info('callDeleteLandlordRelationshipAPI', { traceId, args })
  try {
    const { relationshipId, id } = args
    await createPlatformAxiosInstance().delete<DeleteLandlordRelationshipReturn>(
      `${URLS.landlords}/${id}/relationships/${relationshipId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return relationshipId
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteLandlordRelationshipAPI' })
    return handleErrorResult
  }
}

export const callUpdateLandlordAPI = async (args: UpdateLandlordArgs, context: ServerContext): UpdateLandlordReturn => {
  const traceId = context.traceId
  logger.info('callUpdateLandlordAPI', { traceId, args })
  try {
    const { _eTag, id, ...payload } = args

    const updateResponse = await createPlatformAxiosInstance().patch<UpdateLandlordReturn>(
      `${URLS.landlords}/${id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetLandlordByIdAPI({ id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateLandlordAPI' })
    return handleErrorResult
  }
}
