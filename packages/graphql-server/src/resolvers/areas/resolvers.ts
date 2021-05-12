import areaServices from './services'
import logger from '../../logger'
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

export const queryGetAreaById = resolverHandler<GetAreaByIdArgs, QueryGetAreaByIdReturn>((_: any, args: GetAreaByIdArgs, context: ServerContext): QueryGetAreaByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetAreaById', { traceId, args })
  return areaServices.getAreaById(args, context)
})

export const queryGetAreas = resolverHandler<GetAreasArgs, QueryGetAreasReturn>((_: any, args: GetAreasArgs, context: ServerContext): QueryGetAreasReturn => {
  const traceId = context.traceId
  logger.info('queryGetAreas', { traceId, args })
  return areaServices.getAreas(args, context)
})

export const mutationCreateArea = resolverHandler<CreateAreaArgs, MutationCreateAreaReturn>((_: any, args: CreateAreaArgs, context: ServerContext): MutationCreateAreaReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateArea', { traceId, args })
  return areaServices.createArea(args, context)
})

export const mutationUpdateArea = resolverHandler<UpdateAreaArgs, MutationUpdateAreaReturn>((_: any, args: UpdateAreaArgs, context: ServerContext): MutationUpdateAreaReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateArea', { traceId, args })
  return areaServices.updateArea(args, context)
})

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
