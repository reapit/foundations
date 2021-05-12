import vendorServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetVendorByIdArgs,
  GetVendorsArgs,
  UpdateVendorArgs,
  QueryGetVendorByIdReturn,
  QueryGetVendorsReturn,
  MutationUpdateVendorReturn,
  GetVendorRelationshipsArgs,
  QueryGetVendorRelationshipsReturn,
  QueryGetVendorRelationshipByIdReturn,
  GetVendorRelationshipByIdArgs,
  CreateVendorRelationshipArgs,
  MutationCreateVendorRelationshipReturn,
  DeleteVendorRelationshipArgs,
  MutationDeleteVendorRelationshipReturn,
} from './vendors'

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
  return vendorServices.getVendorById(args, context)
}

export const queryGetVendors = (_: any, args: GetVendorsArgs, context: ServerContext): QueryGetVendorsReturn => {
  const traceId = context.traceId
  logger.info('queryGetVendors', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return vendorServices.getVendors(args, context)
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
  return vendorServices.updateVendor(args, context)
}

export const queryGetVendorRelationships = (
  _: any,
  args: GetVendorRelationshipsArgs,
  context: ServerContext,
): QueryGetVendorRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('queryGetVendorRelationships', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return vendorServices.getVendorRelationships(args, context)
}

export const queryGetVendorRelationshipById = (
  _: any,
  args: GetVendorRelationshipByIdArgs,
  context: ServerContext,
): QueryGetVendorRelationshipByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetVendorRelationshipById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return vendorServices.getVendorRelationshipById(args, context)
}

export const mutationCreateVendorRelationship = (
  _: any,
  args: CreateVendorRelationshipArgs,
  context: ServerContext,
): MutationCreateVendorRelationshipReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateVendorRelationship', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return vendorServices.createVendorRelationship(args, context)
}

export const mutationDeleteVendorRelationship = (
  _: any,
  args: DeleteVendorRelationshipArgs,
  context: ServerContext,
): MutationDeleteVendorRelationshipReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteVendorRelationship', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return vendorServices.deleteVendorRelationship(args, context)
}

export default {
  Query: {
    GetVendorById: queryGetVendorById,
    GetVendors: queryGetVendors,
    GetVendorRelationships: queryGetVendorRelationships,
    GetVendorRelationshipById: queryGetVendorRelationshipById,
  },
  Mutation: {
    UpdateVendor: mutationUpdateVendor,
    CreateVendorRelationship: mutationCreateVendorRelationship,
    DeleteVendorRelationship: mutationDeleteVendorRelationship,
  },
}
