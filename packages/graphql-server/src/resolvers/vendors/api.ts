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
} from './vendors'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'

export const callGetVendorByIdAPI = async (args: GetVendorByIdArgs, context: ServerContext): GetVendorByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetVendorByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetVendorByIdReturn>(`${URLS.vendors}/${args.id}`, {
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
