import { ServerContext } from '../../utils'
import {
  GetConveyancingByIdArgs,
  UpdateConveyancingArgs,
  GetConveyancingArgs,
  GetConveyancingChainArgs,
  GetConveyancingByIdReturn,
  GetConveyancingReturn,
  GetConveyancingChainReturn,
  UpdateConveyancingReturn,
  CreateDownwardLinkModelArgs,
  CreateDownwardLinkModelReturn,
  CreateUpwardLinkModelArgs,
  CreateUpwardLinkModelReturn,
  DeleteDownwardLinkModelArgs,
  DeleteDownwardLinkModelReturn,
  DeleteUpwardLinkModelArgs,
  DeleteUpwardLinkModelReturn,
} from './conveyancing'
import {
  callGetConveyancingByIdAPI,
  callGetConveyancingAPI,
  callUpdateConveyancingAPI,
  callGetConveyancingChainAPI,
  callCreateDownwardLinkModelAPI,
  callCreateUpwardLinkModelAPI,
  callDeleteDownwardLinkModelAPI,
  callDeleteUpwardLinkModelAPI,
} from './api'

export const getConveyancingById = (
  args: GetConveyancingByIdArgs,
  context: ServerContext,
): GetConveyancingByIdReturn => {
  const property = callGetConveyancingByIdAPI(args, context)
  return property
}

export const getConveyancing = (args: GetConveyancingArgs, context: ServerContext): GetConveyancingReturn => {
  const companies = callGetConveyancingAPI(args, context)
  return companies
}

export const getConveyancingChain = (
  args: GetConveyancingChainArgs,
  context: ServerContext,
): GetConveyancingChainReturn => {
  const companyChain = callGetConveyancingChainAPI(args, context)
  return companyChain
}

export const updateConveyancing = (args: UpdateConveyancingArgs, context: ServerContext): UpdateConveyancingReturn => {
  const updateResult = callUpdateConveyancingAPI({ ...args }, context)
  return updateResult
}

export const createDownwardLinkModel = (
  args: CreateDownwardLinkModelArgs,
  context: ServerContext,
): CreateDownwardLinkModelReturn => {
  const createResult = callCreateDownwardLinkModelAPI(args, context)
  return createResult
}

export const createUpwardLinkModel = (
  args: CreateUpwardLinkModelArgs,
  context: ServerContext,
): CreateUpwardLinkModelReturn => {
  const createResult = callCreateUpwardLinkModelAPI(args, context)
  return createResult
}

export const deleteDownwardLinkModel = (
  args: DeleteDownwardLinkModelArgs,
  context: ServerContext,
): DeleteDownwardLinkModelReturn => {
  const deleteResult = callDeleteDownwardLinkModelAPI({ ...args }, context)
  return deleteResult
}

export const deleteUpwardLinkModel = (
  args: DeleteUpwardLinkModelArgs,
  context: ServerContext,
): DeleteUpwardLinkModelReturn => {
  const deleteResult = callDeleteUpwardLinkModelAPI({ ...args }, context)
  return deleteResult
}

const propertyServices = {
  getConveyancingById,
  getConveyancing,
  getConveyancingChain,
  updateConveyancing,
  createDownwardLinkModel,
  createUpwardLinkModel,
  deleteDownwardLinkModel,
  deleteUpwardLinkModel,
}

export default propertyServices
