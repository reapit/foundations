import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  GetApplicantByIdArgs,
  CreateApplicantArgs,
  UpdateApplicantArgs,
  GetApplicantsArgs,
  GetApplicantByIdReturn,
  GetApplicantsReturn,
  CreateApplicantReturn,
  UpdateApplicantReturn,
  GetApplicantRelationshipsByIdArgs,
  GetApplicantRelationshipsByIdReturn,
  GetApplicantRelationshipsArgs,
  GetApplicantRelationshipsReturn,
  CreateApplicantRelationshipArgs,
  CreateApplicantRelationshipReturn,
  DeleteApplicantRelationshipArgs,
  DeleteApplicantRelationshipReturn,
} from './applicants'
import {
  callGetApplicantByIdAPI,
  callGetApplicantsAPI,
  callCreateApplicantAPI,
  callUpdateApplicantAPI,
  callGetApplicantRelationshipByIdAPI,
  callGetApplicantRelationshipsAPI,
  callCreateApplicantRelationshipAPI,
  callDeleteApplicantRelationshipAPI,
} from './api'

export const getApplicantById = (args: GetApplicantByIdArgs, context: ServerContext): GetApplicantByIdReturn => {
  const traceId = context.traceId
  logger.info('getApplicantById', { traceId, args })
  const applicant = callGetApplicantByIdAPI(args, context)
  return applicant
}

export const getApplicants = (args: GetApplicantsArgs, context: ServerContext): GetApplicantsReturn => {
  const traceId = context.traceId
  logger.info('getApplicants', { traceId, args })
  const applicants = callGetApplicantsAPI(args, context)
  return applicants
}

export const createApplicant = (args: CreateApplicantArgs, context: ServerContext): CreateApplicantReturn => {
  const traceId = context.traceId
  logger.info('createApplicant', { traceId, args })
  const createResult = callCreateApplicantAPI(args, context)
  return createResult
}

export const updateApplicant = (args: UpdateApplicantArgs, context: ServerContext): UpdateApplicantReturn => {
  const traceId = context.traceId
  logger.info('updateApplicant', { traceId, args })
  const updateResult = callUpdateApplicantAPI({ ...args }, context)
  return updateResult
}

export const getApplicantRelationshipById = (
  args: GetApplicantRelationshipsByIdArgs,
  context: ServerContext,
): GetApplicantRelationshipsByIdReturn => {
  const traceId = context.traceId
  logger.info('getApplicantRelationshipById', { traceId, args })
  const applicant = callGetApplicantRelationshipByIdAPI(args, context)
  return applicant
}

export const getApplicantRelationships = (
  args: GetApplicantRelationshipsArgs,
  context: ServerContext,
): GetApplicantRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('getApplicantRelationships', { traceId, args })
  const applicants = callGetApplicantRelationshipsAPI(args, context)
  return applicants
}

export const createApplicantRelationship = (
  args: CreateApplicantRelationshipArgs,
  context: ServerContext,
): CreateApplicantRelationshipReturn => {
  const traceId = context.traceId
  logger.info('createApplicantRelationship', { traceId, args })
  const createResult = callCreateApplicantRelationshipAPI(args, context)
  return createResult
}

export const deleteApplicantRelationship = (
  args: DeleteApplicantRelationshipArgs,
  context: ServerContext,
): DeleteApplicantRelationshipReturn => {
  const traceId = context.traceId
  logger.info('deleteApplicantRelationship', { traceId, args })
  const deleteResult = callDeleteApplicantRelationshipAPI(args, context)
  return deleteResult
}

const applicantServices = {
  getApplicantById,
  getApplicants,
  createApplicant,
  updateApplicant,
  getApplicantRelationshipById,
  getApplicantRelationships,
  createApplicantRelationship,
  deleteApplicantRelationship,
}

export default applicantServices
