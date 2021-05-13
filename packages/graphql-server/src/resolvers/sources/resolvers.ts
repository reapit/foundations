import sourceServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetSourceByIdArgs,
  CreateSourceArgs,
  GetSourcesArgs,
  UpdateSourceArgs,
  QueryGetSourceByIdReturn,
  QueryGetSourcesReturn,
  MutationCreateSourceReturn,
  MutationUpdateSourceReturn,
} from './sources'

export const queryGetSourceById = resolverHandler<GetSourceByIdArgs, QueryGetSourceByIdReturn>((
  _: any,
  args: GetSourceByIdArgs,
  context: ServerContext,
): QueryGetSourceByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetSourceById', { traceId, args })
  return sourceServices.getSourceById(args, context)
})

export const queryGetSources = resolverHandler<GetSourcesArgs, QueryGetSourcesReturn>((_: any, args: GetSourcesArgs, context: ServerContext): QueryGetSourcesReturn => {
  const traceId = context.traceId
  logger.info('queryGetSources', { traceId, args })
  return sourceServices.getSources(args, context)
})

export const mutationCreateSource = resolverHandler<CreateSourceArgs, MutationCreateSourceReturn>((
  _: any,
  args: CreateSourceArgs,
  context: ServerContext,
): MutationCreateSourceReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateSource', { traceId, args })
  return sourceServices.createSource(args, context)
})

export const mutationUpdateSource = resolverHandler<UpdateSourceArgs, MutationUpdateSourceReturn>((
  _: any,
  args: UpdateSourceArgs,
  context: ServerContext,
): MutationUpdateSourceReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateSource', { traceId, args })
  return sourceServices.updateSource(args, context)
})

export default {
  Query: {
    GetSourceById: queryGetSourceById,
    GetSources: queryGetSources,
  },
  Mutation: {
    CreateSource: mutationCreateSource,
    UpdateSource: mutationUpdateSource,
  },
}
