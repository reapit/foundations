import enquirieServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetEnquiryByIdArgs,
  CreateEnquiryArgs,
  GetEnquiriesArgs,
  QueryGetEnquiryByIdReturn,
  QueryGetEnquiriesReturn,
  MutationCreateEnquiryReturn,
} from './enquiries'

export const queryGetEnquiryById = resolverHandler<GetEnquiryByIdArgs, QueryGetEnquiryByIdReturn>((
  _: any,
  args: GetEnquiryByIdArgs,
  context: ServerContext,
): QueryGetEnquiryByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetEnquiryById', { traceId, args })
  return enquirieServices.getEnquiryById(args, context)
})

export const queryGetEnquiries = resolverHandler<GetEnquiriesArgs, QueryGetEnquiriesReturn>((_: any, args: GetEnquiriesArgs, context: ServerContext): QueryGetEnquiriesReturn => {
  const traceId = context.traceId
  logger.info('queryGetEnquiries', { traceId, args })
  return enquirieServices.getEnquiries(args, context)
})

export const mutationCreateEnquiry = resolverHandler<CreateEnquiryArgs, MutationCreateEnquiryReturn>((
  _: any,
  args: CreateEnquiryArgs,
  context: ServerContext,
): MutationCreateEnquiryReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateEnquiry', { traceId, args })
  return enquirieServices.createEnquiry(args, context)
})

export default {
  Query: {
    GetEnquiryById: queryGetEnquiryById,
    GetEnquiries: queryGetEnquiries,
  },
  Mutation: {
    CreateEnquiry: mutationCreateEnquiry,
  },
}
