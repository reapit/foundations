import VendorServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../index'
import {
  GetVendorByIdArgs,
  GetVendorsArgs,
  UpdateVendorArgs,
  QueryGetVendorByIdReturn,
  QueryGetVendorsReturn,
  MutationUpdateVendorReturn,
} from './Vendors'

export const queryGetVendorById = (
  _: any,
  args: GetVendorByIdArgs,
  context: ServerContext,
): QueryGetVendorByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetVendorById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return VendorServices.getVendorById(args, context)
}

export const queryGetVendors = (_: any, args: GetVendorsArgs, context: ServerContext): QueryGetVendorsReturn => {
  const traceId = context.traceId
  logger.info('queryGetVendors', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return VendorServices.getVendors(args, context)
}

export const mutationUpdateVendor = (
  _: any,
  args: UpdateVendorArgs,
  context: ServerContext,
): MutationUpdateVendorReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateVendor', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return VendorServices.updateVendor(args, context)
}

export default {
  Query: {
    GetVendorById: queryGetVendorById,
    GetVendors: queryGetVendors,
  },
  Mutation: {
    UpdateVendor: mutationUpdateVendor,
  },
}
