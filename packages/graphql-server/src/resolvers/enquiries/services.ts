import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetEnquiryByIdArgs,
  CreateEnquiryArgs,
  GetEnquiriesArgs,
  GetEnquiryByIdReturn,
  GetEnquiriesReturn,
  CreateEnquiryReturn,
} from './enquiries'
import { callGetEnquiryByIdAPI, callGetEnquiriesAPI, callCreateEnquiryAPI } from './api'

export const getEnquiryById = (args: GetEnquiryByIdArgs, context: ServerContext): GetEnquiryByIdReturn => {
  const traceId = context.traceId
  logger.info('getEnquiryById', { traceId, args })
  const enquirie = callGetEnquiryByIdAPI(args, context)
  return enquirie
}

export const getEnquiries = (args: GetEnquiriesArgs, context: ServerContext): GetEnquiriesReturn => {
  const traceId = context.traceId
  logger.info('getEnquiries', { traceId, args })
  const enquiries = callGetEnquiriesAPI(args, context)
  return enquiries
}

export const createEnquiry = (args: CreateEnquiryArgs, context: ServerContext): CreateEnquiryReturn => {
  const traceId = context.traceId
  logger.info('createEnquiry', { traceId, args })
  const createResult = callCreateEnquiryAPI(args, context)
  return createResult
}

const enquirieServices = {
  getEnquiryById,
  getEnquiries,
  createEnquiry,
}

export default enquirieServices
