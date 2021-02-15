import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetVendorByIdArgs,
  UpdateVendorArgs,
  GetVendorsArgs,
  GetVendorByIdReturn,
  GetVendorsReturn,
  UpdateVendorReturn,
  GetVendorRelationshipsArgs,
  GetVendorRelationshipByIdArgs,
  CreateVendorRelationshipArgs,
  DeleteVendorRelationshipArgs,
  GetVendorRelationshipsReturn,
  GetVendorRelationshipByIdReturn,
  CreateVendorRelationshipReturn,
  DeleteVendorRelationshipReturn,
} from './vendors'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetVendorByIdAPI = async (args: GetVendorByIdArgs, context: ServerContext): GetVendorByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetVendorByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetVendorByIdReturn>(`${URLS.vendors}/${id}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetVendorByIdAPI' })
    return handleErrorResult
  }
}

export const callGetVendorsAPI = async (args: GetVendorsArgs, context: ServerContext): GetVendorsReturn => {
  const traceId = context.traceId
  logger.info('callGetVendorsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetVendorsReturn>(`${URLS.vendors}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetVendorsAPI' })
    return handleErrorResult
  }
}

export const callUpdateVendorAPI = async (args: UpdateVendorArgs, context: ServerContext): UpdateVendorReturn => {
  const traceId = context.traceId
  logger.info('callUpdateVendorAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateVendorReturn>(
      `${URLS.vendors}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetVendorByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateVendorAPI' })
    return handleErrorResult
  }
}

export const callGetVendorRelationshipsAPI = async (
  args: GetVendorRelationshipsArgs,
  context: ServerContext,
): GetVendorRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('callGetVendorRelationshipsAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetVendorRelationshipsReturn>(
      `${URLS.vendors}/${args.id}/relationships`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetVendorRelationshipsAPI' })
    return handleErrorResult
  }
}

export const callGetVendorRelationshipByIdAPI = async (
  args: GetVendorRelationshipByIdArgs,
  context: ServerContext,
): GetVendorRelationshipByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetVendorRelationshipByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetVendorRelationshipByIdReturn>(
      `${URLS.vendors}/${args.id}/relationships/${args.relationshipId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetVendorRelationshipByIdAPI' })
    return handleErrorResult
  }
}

export const callCreateVendorRelationshipAPI = async (
  args: CreateVendorRelationshipArgs,
  context: ServerContext,
): CreateVendorRelationshipReturn => {
  const traceId = context.traceId
  logger.info('callCreateVendorRelationshipAPI', { traceId, args })
  try {
    const { id, ...payload } = args
    await createPlatformAxiosInstance().post<CreateVendorRelationshipReturn>(
      `${URLS.vendors}/${id}/relationships`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return true
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateVendorRelationshipAPI' })
    return handleErrorResult
  }
}

export const callDeleteVendorRelationshipAPI = async (
  args: DeleteVendorRelationshipArgs,
  context: ServerContext,
): DeleteVendorRelationshipReturn => {
  const traceId = context.traceId
  logger.info('callDeleteVendorRelationshipAPI', { traceId, args })
  try {
    const { id, relationshipId } = args
    await createPlatformAxiosInstance().delete<DeleteVendorRelationshipReturn>(
      `${URLS.vendors}/${id}/relationshipId/${relationshipId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return true
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteVendorRelationshipAPI' })
    return handleErrorResult
  }
}
