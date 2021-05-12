import landlordServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetLandlordByIdArgs,
  QueryGetLandlordByIdReturn,
  GetLandlordsArgs,
  QueryGetLandlordsReturn,
  GetLandlordRelationshipsArgs,
  QueryGetLandlordRelationshipsReturn,
  GetLandlordRelationshipByIdArgs,
  QueryGetLandlordRelationshipByIdReturn,
  CreateLandlordArgs,
  MutationCreateLandlordReturn,
  CreateLandlordRelationshipArgs,
  MutationCreateLandlordRelationshipReturn,
  UpdateLandlordArgs,
  MutationUpdateLandlordReturn,
  DeleteLandlordRelationshipArgs,
  MutationDeleteLandlordRelationshipReturn,
} from './landlords'

export const queryGetLandlordById = (
  _: any,
  args: GetLandlordByIdArgs,
  context: ServerContext,
): QueryGetLandlordByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetLandlordById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.getLandlordById(args, context)
}

export const queryGetLandlords = (_: any, args: GetLandlordsArgs, context: ServerContext): QueryGetLandlordsReturn => {
  const traceId = context.traceId
  logger.info('queryGetLandlords', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.getLandlords(args, context)
}

export const queryGetLandlordRelationshipById = (
  _: any,
  args: GetLandlordRelationshipByIdArgs,
  context: ServerContext,
): QueryGetLandlordRelationshipByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetLandlordRelationshipById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.getLandlordRelationshipById(args, context)
}

export const queryGetLandlordRelationships = (
  _: any,
  args: GetLandlordRelationshipsArgs,
  context: ServerContext,
): QueryGetLandlordRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('queryGetLandlordRelationships', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.getLandlordRelationships(args, context)
}

export const mutationCreateLandlord = (
  _: any,
  args: CreateLandlordArgs,
  context: ServerContext,
): MutationCreateLandlordReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateLandlord', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.createLandlord(args, context)
}

export const mutationCreateLandlordRelationship = (
  _: any,
  args: CreateLandlordRelationshipArgs,
  context: ServerContext,
): MutationCreateLandlordRelationshipReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateLandlordRelationship', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.createLandlordRelationship(args, context)
}

export const mutationDeleteLandlordRelationship = (
  _: any,
  args: DeleteLandlordRelationshipArgs,
  context: ServerContext,
): MutationDeleteLandlordRelationshipReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteLandlordRelationship', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.deleteLandlordRelationship(args, context)
}

export const mutationUpdateLandlord = (
  _: any,
  args: UpdateLandlordArgs,
  context: ServerContext,
): MutationUpdateLandlordReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateLandlord', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return landlordServices.updateLandlord(args, context)
}

export default {
  Query: {
    GetLandlords: queryGetLandlords,
    GetLandlordById: queryGetLandlordById,
    GetLandlordRelationships: queryGetLandlordRelationships,
    GetLandlordRelationshipById: queryGetLandlordRelationshipById,
  },
  Mutation: {
    CreateLandlord: mutationCreateLandlord,
    CreateLandlordRelationship: mutationCreateLandlordRelationship,
    DeleteLandlordRelationship: mutationDeleteLandlordRelationship,
    UpdateLandlord: mutationUpdateLandlord,
  },
}
