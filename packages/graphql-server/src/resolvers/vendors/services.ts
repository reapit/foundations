import { ServerContext } from '../../utils'
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
  return callGetVendorByIdAPI(args, context)
}

export const getVendors = (args: GetVendorsArgs, context: ServerContext): GetVendorsReturn => {
  return callGetVendorsAPI(args, context)
}

export const updateVendor = (args: UpdateVendorArgs, context: ServerContext): UpdateVendorReturn => {
  return callUpdateVendorAPI({ ...args }, context)
}

export const getVendorRelationships = (args: GetVendorRelationshipsArgs, context: ServerContext): GetVendorsReturn => {
  return callGetVendorRelationshipsAPI(args, context)
}

export const getVendorRelationshipById = (
  args: GetVendorRelationshipByIdArgs,
  context: ServerContext,
): GetVendorRelationshipByIdReturn => {
  return callGetVendorRelationshipByIdAPI(args, context)
}

export const createVendorRelationship = (
  args: CreateVendorRelationshipArgs,
  context: ServerContext,
): CreateVendorRelationshipReturn => {
  return callCreateVendorRelationshipAPI({ ...args }, context)
}

export const deleteVendorRelationship = (
  args: DeleteVendorRelationshipArgs,
  context: ServerContext,
): DeleteVendorRelationshipReturn => {
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
