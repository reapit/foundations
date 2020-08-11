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
import { callGetVendorByIdAPI, callGetVendorsAPI, callUpdateVendorAPI } from './api'

export const getVendorById = (args: GetVendorByIdArgs, context: ServerContext): GetVendorByIdReturn => {
  const traceId = context.traceId
  logger.info('getVendorById', { traceId, args })
  const Vendor = callGetVendorByIdAPI(args, context)
  return Vendor
}

export const getVendors = (args: GetVendorsArgs, context: ServerContext): GetVendorsReturn => {
  const traceId = context.traceId
  logger.info('getVendors', { traceId, args })
  const Vendors = callGetVendorsAPI(args, context)
  return Vendors
}

export const updateVendor = (args: UpdateVendorArgs, context: ServerContext): UpdateVendorReturn => {
  const traceId = context.traceId
  logger.info('updateVendor', { traceId, args })
  const updateResult = callUpdateVendorAPI({ ...args }, context)
  return updateResult
}

const VendorServices = {
  getVendorById,
  getVendors,
  updateVendor,
}

export default VendorServices
