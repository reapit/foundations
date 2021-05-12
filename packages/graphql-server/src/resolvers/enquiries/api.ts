import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  GetEnquiryByIdArgs,
  CreateEnquiryArgs,
  GetEnquiriesArgs,
  GetEnquiryByIdReturn,
  GetEnquiriesReturn,
  CreateEnquiryReturn,
} from './enquiries'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetEnquiryByIdAPI = async (args: GetEnquiryByIdArgs, context: ServerContext): GetEnquiryByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetEnquirieByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetEnquiryByIdReturn>(`${URLS.enquiries}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetEnquiryByIdAPI' })
    return handleErrorResult
  }
}

export const callGetEnquiriesAPI = async (args: GetEnquiriesArgs, context: ServerContext): GetEnquiriesReturn => {
  const traceId = context.traceId
  logger.info('callGetEnquiriesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetEnquiriesReturn>(`${URLS.enquiries}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetEnquiriesAPI' })
    return handleErrorResult
  }
}

export const callCreateEnquiryAPI = async (args: CreateEnquiryArgs, context: ServerContext): CreateEnquiryReturn => {
  const traceId = context.traceId
  logger.info('callCreateEnquiryAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateEnquiryReturn>(URLS.enquiries, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetEnquiryByIdAPI({ id: parseInt(id) }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateEnquiryAPI' })
    return handleErrorResult
  }
}
