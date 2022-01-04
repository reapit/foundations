import { ServerContext } from '../../utils'
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
  const enquirie = callGetEnquiryByIdAPI(args, context)
  return enquirie
}

export const getEnquiries = (args: GetEnquiriesArgs, context: ServerContext): GetEnquiriesReturn => {
  const enquiries = callGetEnquiriesAPI(args, context)
  return enquiries
}

export const createEnquiry = (args: CreateEnquiryArgs, context: ServerContext): CreateEnquiryReturn => {
  const createResult = callCreateEnquiryAPI(args, context)
  return createResult
}

const enquirieServices = {
  getEnquiryById,
  getEnquiries,
  createEnquiry,
}

export default enquirieServices
