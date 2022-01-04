import negotiatorServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetNegotiatorByIdArgs,
  CreateNegotiatorArgs,
  GetNegotiatorsArgs,
  UpdateNegotiatorArgs,
  QueryGetNegotiatorByIdReturn,
  QueryGetNegotiatorsReturn,
  MutationCreateNegotiatorReturn,
  MutationUpdateNegotiatorReturn,
} from './negotiators'

export const queryGetNegotiatorById = resolverHandler<GetNegotiatorByIdArgs, QueryGetNegotiatorByIdReturn>(
  (_: any, args: GetNegotiatorByIdArgs, context: ServerContext): QueryGetNegotiatorByIdReturn => {
    return negotiatorServices.getNegotiatorById(args, context)
  },
)

export const queryGetNegotiators = resolverHandler<GetNegotiatorsArgs, QueryGetNegotiatorsReturn>(
  (_: any, args: GetNegotiatorsArgs, context: ServerContext): QueryGetNegotiatorsReturn => {
    return negotiatorServices.getNegotiators(args, context)
  },
)

export const mutationCreateNegotiator = resolverHandler<CreateNegotiatorArgs, MutationCreateNegotiatorReturn>(
  (_: any, args: CreateNegotiatorArgs, context: ServerContext): MutationCreateNegotiatorReturn => {
    return negotiatorServices.createNegotiator(args, context)
  },
)

export const mutationUpdateNegotiator = resolverHandler<UpdateNegotiatorArgs, MutationUpdateNegotiatorReturn>(
  (_: any, args: UpdateNegotiatorArgs, context: ServerContext): MutationUpdateNegotiatorReturn => {
    return negotiatorServices.updateNegotiator(args, context)
  },
)

export default {
  Query: {
    GetNegotiatorById: queryGetNegotiatorById,
    GetNegotiators: queryGetNegotiators,
  },
  Mutation: {
    CreateNegotiator: mutationCreateNegotiator,
    UpdateNegotiator: mutationUpdateNegotiator,
  },
}
