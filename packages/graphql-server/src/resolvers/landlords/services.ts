import { ServerContext } from '../../utils'
import {
  GetLandlordByIdArgs,
  GetLandlordByIdReturn,
  GetLandlordsArgs,
  GetLandlordsReturn,
  GetLandlordRelationshipsArgs,
  GetLandlordRelationshipsReturn,
  GetLandlordRelationshipByIdArgs,
  GetLandlordRelationshipByIdReturn,
  CreateLandlordArgs,
  CreateLandlordReturn,
  CreateLandlordRelationshipArgs,
  CreateLandlordRelationshipReturn,
  DeleteLandlordRelationshipArgs,
  DeleteLandlordRelationshipReturn,
  UpdateLandlordArgs,
  UpdateLandlordReturn,
} from './landlords'
import {
  callGetLandlordByIdAPI,
  callGetLandlordsAPI,
  callGetLandlordRelationshipByIdAPI,
  callGetLandlordRelationshipsAPI,
  callCreateLandlordAPI,
  callCreateLandlordRelationshipAPI,
  callDeleteLandlordRelationshipAPI,
  callUpdateLandlordAPI,
} from './api'

export const getLandlordById = (args: GetLandlordByIdArgs, context: ServerContext): GetLandlordByIdReturn => {
  const landlord = callGetLandlordByIdAPI(args, context)
  return landlord
}

export const getLandlords = (args: GetLandlordsArgs, context: ServerContext): GetLandlordsReturn => {
  const landlords = callGetLandlordsAPI(args, context)
  return landlords
}

export const getLandlordRelationshipById = (
  args: GetLandlordRelationshipByIdArgs,
  context: ServerContext,
): GetLandlordRelationshipByIdReturn => {
  const landlordRelationship = callGetLandlordRelationshipByIdAPI(args, context)
  return landlordRelationship
}

export const getLandlordRelationships = (
  args: GetLandlordRelationshipsArgs,
  context: ServerContext,
): GetLandlordRelationshipsReturn => {
  const landlordRelationships = callGetLandlordRelationshipsAPI(args, context)
  return landlordRelationships
}

export const createLandlord = (args: CreateLandlordArgs, context: ServerContext): CreateLandlordReturn => {
  const createdLandlord = callCreateLandlordAPI(args, context)
  return createdLandlord
}

export const createLandlordRelationship = (
  args: CreateLandlordRelationshipArgs,
  context: ServerContext,
): CreateLandlordRelationshipReturn => {
  const createdLandlordRelationship = callCreateLandlordRelationshipAPI(args, context)
  return createdLandlordRelationship
}

export const updateLandlord = (args: UpdateLandlordArgs, context: ServerContext): UpdateLandlordReturn => {
  const updatedLandlord = callUpdateLandlordAPI(args, context)
  return updatedLandlord
}

export const deleteLandlordRelationship = (
  args: DeleteLandlordRelationshipArgs,
  context: ServerContext,
): DeleteLandlordRelationshipReturn => {
  const isDeleted = callDeleteLandlordRelationshipAPI(args, context)
  return isDeleted
}

const landlordServices = {
  getLandlordById,
  getLandlords,
  getLandlordRelationships,
  getLandlordRelationshipById,
  createLandlord,
  createLandlordRelationship,
  deleteLandlordRelationship,
  updateLandlord,
}

export default landlordServices
