import { ServerContext } from '../../utils'
import {
  GetNegotiatorByIdArgs,
  CreateNegotiatorArgs,
  UpdateNegotiatorArgs,
  GetNegotiatorsArgs,
  GetNegotiatorByIdReturn,
  GetNegotiatorsReturn,
  CreateNegotiatorReturn,
  UpdateNegotiatorReturn,
} from './negotiators'
import {
  callGetNegotiatorByIdAPI,
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
} from './api'

export const getNegotiatorById = (args: GetNegotiatorByIdArgs, context: ServerContext): GetNegotiatorByIdReturn => {
  const negotiator = callGetNegotiatorByIdAPI(args, context)
  return negotiator
}

export const getNegotiators = (args: GetNegotiatorsArgs, context: ServerContext): GetNegotiatorsReturn => {
  const negotiators = callGetNegotiatorsAPI(args, context)
  return negotiators
}

export const createNegotiator = (args: CreateNegotiatorArgs, context: ServerContext): CreateNegotiatorReturn => {
  const createResult = callCreateNegotiatorAPI(args, context)
  return createResult
}

export const updateNegotiator = (args: UpdateNegotiatorArgs, context: ServerContext): UpdateNegotiatorReturn => {
  const updateResult = callUpdateNegotiatorAPI({ ...args }, context)
  return updateResult
}

const negotiatorServices = {
  getNegotiatorById,
  getNegotiators,
  createNegotiator,
  updateNegotiator,
}

export default negotiatorServices
