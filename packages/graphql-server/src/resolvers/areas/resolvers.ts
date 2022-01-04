import areaServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetAreaByIdArgs,
  CreateAreaArgs,
  GetAreasArgs,
  UpdateAreaArgs,
  QueryGetAreaByIdReturn,
  QueryGetAreasReturn,
  MutationCreateAreaReturn,
  MutationUpdateAreaReturn,
} from './areas'

export const queryGetAreaById = resolverHandler<GetAreaByIdArgs, QueryGetAreaByIdReturn>(
  (_: any, args: GetAreaByIdArgs, context: ServerContext): QueryGetAreaByIdReturn => {
    return areaServices.getAreaById(args, context)
  },
)

export const queryGetAreas = resolverHandler<GetAreasArgs, QueryGetAreasReturn>(
  (_: any, args: GetAreasArgs, context: ServerContext): QueryGetAreasReturn => {
    return areaServices.getAreas(args, context)
  },
)

export const mutationCreateArea = resolverHandler<CreateAreaArgs, MutationCreateAreaReturn>(
  (_: any, args: CreateAreaArgs, context: ServerContext): MutationCreateAreaReturn => {
    return areaServices.createArea(args, context)
  },
)

export const mutationUpdateArea = resolverHandler<UpdateAreaArgs, MutationUpdateAreaReturn>(
  (_: any, args: UpdateAreaArgs, context: ServerContext): MutationUpdateAreaReturn => {
    return areaServices.updateArea(args, context)
  },
)

export default {
  Query: {
    GetAreaById: queryGetAreaById,
    GetAreas: queryGetAreas,
  },
  Mutation: {
    CreateArea: mutationCreateArea,
    UpdateArea: mutationUpdateArea,
  },
}
