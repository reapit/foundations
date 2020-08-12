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
  GetVendorRelationshipByIdReturn,
  CreateVendorRelationshipReturn,
  CreateVendorRelationshipArgs,
  DeleteVendorRelationshipReturn,
  DeleteVendorRelationshipArgs,
} from './vendors'
import {
  callGetVendorByIdAPI,
  callGetVendorsAPI,
  callUpdateVendorAPI,
  callGetVendorRelationshipsAPI,
  callGetVendorRelationshipByIdAPI,
  callCreateVendorRelationshipAPI,
  callDeleteVendorRelationshipAPI,
} from './api'

export const getVendorById = (args: GetVendorByIdArgs, context: ServerContext): GetVendorByIdReturn => {
  const traceId = context.traceId
  logger.info('getVendorById', { traceId, args })
  return callGetVendorByIdAPI(args, context)
}

export const getVendors = (args: GetVendorsArgs, context: ServerContext): GetVendorsReturn => {
  const traceId = context.traceId
  logger.info('getVendors', { traceId, args })
  return callGetVendorsAPI(args, context)
}

export const updateVendor = (args: UpdateVendorArgs, context: ServerContext): UpdateVendorReturn => {
  const traceId = context.traceId
  logger.info('updateVendor', { traceId, args })
  return callUpdateVendorAPI({ ...args }, context)
}

export const getVendorRelationships = (args: GetVendorRelationshipsArgs, context: ServerContext): GetVendorsReturn => {
  const traceId = context.traceId
  logger.info('getVendorRelationships', { traceId, args })
  return callGetVendorRelationshipsAPI(args, context)
}

export const getVendorRelationshipById = (
  args: GetVendorRelationshipByIdArgs,
  context: ServerContext,
): GetVendorRelationshipByIdReturn => {
  const traceId = context.traceId
  logger.info('getVendorRelationshipById', { traceId, args })
  return callGetVendorRelationshipByIdAPI(args, context)
}

export const createVendorRelationship = (
  args: CreateVendorRelationshipArgs,
  context: ServerContext,
): CreateVendorRelationshipReturn => {
  const traceId = context.traceId
  logger.info('createVendorRelationship', { traceId, args })
  return callCreateVendorRelationshipAPI({ ...args }, context)
}

export const deleteVendorRelationship = (
  args: DeleteVendorRelationshipArgs,
  context: ServerContext,
): DeleteVendorRelationshipReturn => {
  const traceId = context.traceId
  logger.info('deleteVendorRelationship', { traceId, args })
  return callDeleteVendorRelationshipAPI({ ...args }, context)
}

const vendorServices = {
  getVendorById,
  getVendors,
  updateVendor,
  getVendorRelationships,
  getVendorRelationshipById,
  createVendorRelationship,
  deleteVendorRelationship,
}

export default vendorServices
