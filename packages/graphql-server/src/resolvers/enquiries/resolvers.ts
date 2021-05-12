import enquirieServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetEnquiryByIdArgs,
  CreateEnquiryArgs,
  GetEnquiriesArgs,
  QueryGetEnquiryByIdReturn,
  QueryGetEnquiriesReturn,
  MutationCreateEnquiryReturn,
} from './enquiries'

export const queryGetEnquiryById = (
  _: any,
  args: GetEnquiryByIdArgs,
  context: ServerContext,
): QueryGetEnquiryByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetEnquiryById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return enquirieServices.getEnquiryById(args, context)
}

export const queryGetEnquiries = (_: any, args: GetEnquiriesArgs, context: ServerContext): QueryGetEnquiriesReturn => {
  const traceId = context.traceId
  logger.info('queryGetEnquiries', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return enquirieServices.getEnquiries(args, context)
}

export const mutationCreateEnquiry = (
  _: any,
  args: CreateEnquiryArgs,
  context: ServerContext,
): MutationCreateEnquiryReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateEnquiry', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return enquirieServices.createEnquiry(args, context)
}

export default {
  Query: {
    GetEnquiryById: queryGetEnquiryById,
    GetEnquiries: queryGetEnquiries,
  },
  Mutation: {
    CreateEnquiry: mutationCreateEnquiry,
  },
}
