import sourceServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
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

export const queryGetSourceById = (
  _: any,
  args: GetSourceByIdArgs,
  context: ServerContext,
): QueryGetSourceByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetSourceById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return sourceServices.getSourceById(args, context)
}

export const queryGetSources = (_: any, args: GetSourcesArgs, context: ServerContext): QueryGetSourcesReturn => {
  const traceId = context.traceId
  logger.info('queryGetSources', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return sourceServices.getSources(args, context)
}

export const mutationCreateSource = (
  _: any,
  args: CreateSourceArgs,
  context: ServerContext,
): MutationCreateSourceReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateSource', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return sourceServices.createSource(args, context)
}

export const mutationUpdateSource = (
  _: any,
  args: UpdateSourceArgs,
  context: ServerContext,
): MutationUpdateSourceReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateSource', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return sourceServices.updateSource(args, context)
}

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
