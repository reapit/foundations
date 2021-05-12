import propertyServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetConveyancingByIdArgs,
  GetConveyancingArgs,
  UpdateConveyancingArgs,
  QueryGetConveyancingByIdReturn,
  QueryGetConveyancingReturn,
  MutationUpdateConveyancingReturn,
  GetConveyancingChainArgs,
  QueryGetConveyancingChainReturn,
  CreateUpwardLinkModelArgs,
  MutationCreateUpwardLinkModelReturn,
  CreateDownwardLinkModelArgs,
  MutationCreateDownwardLinkModelReturn,
  DeleteUpwardLinkModelArgs,
  MutationDeleteUpwardLinkModelReturn,
  DeleteDownwardLinkModelArgs,
  MutationDeleteDownwardLinkModelReturn,
} from './conveyancing'

export const queryGetConveyancingById = (
  _: any,
  args: GetConveyancingByIdArgs,
  context: ServerContext,
): QueryGetConveyancingByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetConveyancingById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getConveyancingById(args, context)
}

export const queryGetConveyancing = (
  _: any,
  args: GetConveyancingArgs,
  context: ServerContext,
): QueryGetConveyancingReturn => {
  const traceId = context.traceId
  logger.info('queryGetConveyancing', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getConveyancing(args, context)
}

export const queryGetConveyancingChain = (
  _: any,
  args: GetConveyancingChainArgs,
  context: ServerContext,
): QueryGetConveyancingChainReturn => {
  const traceId = context.traceId
  logger.info('queryGetConveyancingChain', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getConveyancingChain(args, context)
}

export const mutationUpdateConveyancing = (
  _: any,
  args: UpdateConveyancingArgs,
  context: ServerContext,
): MutationUpdateConveyancingReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateConveyancing', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.updateConveyancing(args, context)
}

export const mutationCreateUpwardLinkModel = (
  _: any,
  args: CreateUpwardLinkModelArgs,
  context: ServerContext,
): MutationCreateUpwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateUpwardLinkModel', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.createUpwardLinkModel(args, context)
}

export const mutationCreateDownwardLinkModel = (
  _: any,
  args: CreateDownwardLinkModelArgs,
  context: ServerContext,
): MutationCreateDownwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateDownwardLinkModel', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.createDownwardLinkModel(args, context)
}

export const mutationDeleteUpwardLinkModel = (
  _: any,
  args: DeleteUpwardLinkModelArgs,
  context: ServerContext,
): MutationDeleteUpwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteUpwardLinkModel', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.deleteUpwardLinkModel(args, context)
}

export const mutationDeleteDownwardLinkModel = (
  _: any,
  args: DeleteDownwardLinkModelArgs,
  context: ServerContext,
): MutationDeleteDownwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteDownwardLinkModel', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.deleteDownwardLinkModel(args, context)
}

export default {
  Query: {
    GetConveyancingById: queryGetConveyancingById,
    GetConveyancing: queryGetConveyancing,
    GetConveyancingChain: queryGetConveyancingChain,
  },
  Mutation: {
    UpdateConveyancing: mutationUpdateConveyancing,
    CreateDownwardLinkModel: mutationCreateDownwardLinkModel,
    CreateUpwardLinkModel: mutationCreateUpwardLinkModel,
    DeleteDownwardLinkModel: mutationDeleteDownwardLinkModel,
    DeleteUpwardLinkModel: mutationDeleteUpwardLinkModel,
  },
}
