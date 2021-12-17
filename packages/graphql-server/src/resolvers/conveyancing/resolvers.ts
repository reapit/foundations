import propertyServices from './services'
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

export const queryGetConveyancingById = resolverHandler<GetConveyancingByIdArgs, QueryGetConveyancingByIdReturn>(
  (_: any, args: GetConveyancingByIdArgs, context: ServerContext): QueryGetConveyancingByIdReturn => {
    return propertyServices.getConveyancingById(args, context)
  },
)

export const queryGetConveyancing = resolverHandler<GetConveyancingArgs, QueryGetConveyancingReturn>(
  (_: any, args: GetConveyancingArgs, context: ServerContext): QueryGetConveyancingReturn => {
    return propertyServices.getConveyancing(args, context)
  },
)

export const queryGetConveyancingChain = resolverHandler<GetConveyancingChainArgs, QueryGetConveyancingChainReturn>(
  (_: any, args: GetConveyancingChainArgs, context: ServerContext): QueryGetConveyancingChainReturn => {
    return propertyServices.getConveyancingChain(args, context)
  },
)

export const mutationUpdateConveyancing = resolverHandler<UpdateConveyancingArgs, MutationUpdateConveyancingReturn>(
  (_: any, args: UpdateConveyancingArgs, context: ServerContext): MutationUpdateConveyancingReturn => {
    return propertyServices.updateConveyancing(args, context)
  },
)

export const mutationCreateUpwardLinkModel = resolverHandler<
  CreateUpwardLinkModelArgs,
  MutationCreateUpwardLinkModelReturn
>((_: any, args: CreateUpwardLinkModelArgs, context: ServerContext): MutationCreateUpwardLinkModelReturn => {
  return propertyServices.createUpwardLinkModel(args, context)
})

export const mutationCreateDownwardLinkModel = resolverHandler<
  CreateDownwardLinkModelArgs,
  MutationCreateDownwardLinkModelReturn
>((_: any, args: CreateDownwardLinkModelArgs, context: ServerContext): MutationCreateDownwardLinkModelReturn => {
  return propertyServices.createDownwardLinkModel(args, context)
})

export const mutationDeleteUpwardLinkModel = resolverHandler<
  DeleteUpwardLinkModelArgs,
  MutationDeleteUpwardLinkModelReturn
>((_: any, args: DeleteUpwardLinkModelArgs, context: ServerContext): MutationDeleteUpwardLinkModelReturn => {
  return propertyServices.deleteUpwardLinkModel(args, context)
})

export const mutationDeleteDownwardLinkModel = resolverHandler<
  DeleteDownwardLinkModelArgs,
  MutationDeleteDownwardLinkModelReturn
>((_: any, args: DeleteDownwardLinkModelArgs, context: ServerContext): MutationDeleteDownwardLinkModelReturn => {
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
