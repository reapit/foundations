import { ServerContext } from '../../utils'
import {
  GetTenancyByIdArgs,
  GetTenancyByIdReturn,
  GetTenanciesArgs,
  GetTenanciesReturn,
  GetTenancyRelationshipsArgs,
  GetTenancyRelationshipsReturn,
  GetTenancyChecksArgs,
  GetTenancyChecksReturn,
  GetTenancyCheckByIdArgs,
  GetTenancyCheckByIdReturn,
  CreateTenancyArgs,
  CreateTenancyReturn,
  CreateTenancyCheckArgs,
  CreateTenancyCheckReturn,
  DeleteTenancyCheckArgs,
  DeleteTenancyCheckReturn,
  UpdateTenancyCheckArgs,
  UpdateTenancyCheckReturn,
} from './tenancies'
import {
  callGetTenancyByIdAPI,
  callGetTenanciesAPI,
  callGetTenancyChecksAPI,
  callGetTenancyCheckByIdAPI,
  callGetTenancyRelationshipsAPI,
  callCreateTenancyAPI,
  callCreateTenancyCheckAPI,
  callDeleteTenancyCheckAPI,
  callUpdateTenancyCheckAPI,
} from './api'

export const getTenancyById = (args: GetTenancyByIdArgs, context: ServerContext): GetTenancyByIdReturn => {
  const tenancy = callGetTenancyByIdAPI(args, context)
  return tenancy
}

export const getTenancies = (args: GetTenanciesArgs, context: ServerContext): GetTenanciesReturn => {
  const tenancies = callGetTenanciesAPI(args, context)
  return tenancies
}

export const getTenancyCheckById = (
  args: GetTenancyCheckByIdArgs,
  context: ServerContext,
): GetTenancyCheckByIdReturn => {
  const tenancyCheck = callGetTenancyCheckByIdAPI(args, context)
  return tenancyCheck
}

export const getTenancyChecks = (args: GetTenancyChecksArgs, context: ServerContext): GetTenancyChecksReturn => {
  const tenancyChecks = callGetTenancyChecksAPI(args, context)
  return tenancyChecks
}

export const getTenancyRelationships = (
  args: GetTenancyRelationshipsArgs,
  context: ServerContext,
): GetTenancyRelationshipsReturn => {
  const tenancyRelationships = callGetTenancyRelationshipsAPI(args, context)
  return tenancyRelationships
}

export const createTenancy = (args: CreateTenancyArgs, context: ServerContext): CreateTenancyReturn => {
  const createdTenancy = callCreateTenancyAPI(args, context)
  return createdTenancy
}

export const createTenancyCheck = (args: CreateTenancyCheckArgs, context: ServerContext): CreateTenancyCheckReturn => {
  const createdTenancyCheck = callCreateTenancyCheckAPI(args, context)
  return createdTenancyCheck
}

export const updateTenancyCheck = (args: UpdateTenancyCheckArgs, context: ServerContext): UpdateTenancyCheckReturn => {
  const updatedTenancyCheck = callUpdateTenancyCheckAPI(args, context)
  return updatedTenancyCheck
}

export const deleteTenancyCheck = (args: DeleteTenancyCheckArgs, context: ServerContext): DeleteTenancyCheckReturn => {
  const isDeleted = callDeleteTenancyCheckAPI(args, context)
  return isDeleted
}

const tenancyServices = {
  getTenancyById,
  getTenancies,
  getTenancyChecks,
  getTenancyCheckById,
  getTenancyRelationships,
  createTenancy,
  createTenancyCheck,
  deleteTenancyCheck,
  updateTenancyCheck,
}

export default tenancyServices
