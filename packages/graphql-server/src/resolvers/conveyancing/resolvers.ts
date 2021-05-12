import propertyServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
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

export const queryGetConveyancingById = resolverHandler<GetConveyancingByIdArgs, QueryGetConveyancingByIdReturn>((
  _: any,
  args: GetConveyancingByIdArgs,
  context: ServerContext,
): QueryGetConveyancingByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetConveyancingById', { traceId, args })
  return propertyServices.getConveyancingById(args, context)
})

export const queryGetConveyancing = resolverHandler<GetConveyancingArgs, QueryGetConveyancingReturn>((
  _: any,
  args: GetConveyancingArgs,
  context: ServerContext,
): QueryGetConveyancingReturn => {
  const traceId = context.traceId
  logger.info('queryGetConveyancing', { traceId, args })
  return propertyServices.getConveyancing(args, context)
})

export const queryGetConveyancingChain = resolverHandler<GetConveyancingChainArgs, QueryGetConveyancingChainReturn>((
  _: any,
  args: GetConveyancingChainArgs,
  context: ServerContext,
): QueryGetConveyancingChainReturn => {
  const traceId = context.traceId
  logger.info('queryGetConveyancingChain', { traceId, args })
  return propertyServices.getConveyancingChain(args, context)
})

export const mutationUpdateConveyancing = resolverHandler<UpdateConveyancingArgs, MutationUpdateConveyancingReturn>((
  _: any,
  args: UpdateConveyancingArgs,
  context: ServerContext,
): MutationUpdateConveyancingReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateConveyancing', { traceId, args })
  return propertyServices.updateConveyancing(args, context)
})

export const mutationCreateUpwardLinkModel = resolverHandler<CreateUpwardLinkModelArgs, MutationCreateUpwardLinkModelReturn>((
  _: any,
  args: CreateUpwardLinkModelArgs,
  context: ServerContext,
): MutationCreateUpwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateUpwardLinkModel', { traceId, args })
  return propertyServices.createUpwardLinkModel(args, context)
})

export const mutationCreateDownwardLinkModel = resolverHandler<CreateDownwardLinkModelArgs, MutationCreateDownwardLinkModelReturn>((
  _: any,
  args: CreateDownwardLinkModelArgs,
  context: ServerContext,
): MutationCreateDownwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateDownwardLinkModel', { traceId, args })
  return propertyServices.createDownwardLinkModel(args, context)
})

export const mutationDeleteUpwardLinkModel = resolverHandler<DeleteUpwardLinkModelArgs, MutationDeleteUpwardLinkModelReturn>((
  _: any,
  args: DeleteUpwardLinkModelArgs,
  context: ServerContext,
): MutationDeleteUpwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteUpwardLinkModel', { traceId, args })
  return propertyServices.deleteUpwardLinkModel(args, context)
})

export const mutationDeleteDownwardLinkModel = resolverHandler<DeleteDownwardLinkModelArgs, MutationDeleteDownwardLinkModelReturn>((
  _: any,
  args: DeleteDownwardLinkModelArgs,
  context: ServerContext,
): MutationDeleteDownwardLinkModelReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteDownwardLinkModel', { traceId, args })
  return propertyServices.deleteDownwardLinkModel(args, context)
})

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
