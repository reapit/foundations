import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  GetSourceByIdArgs,
  CreateSourceArgs,
  UpdateSourceArgs,
  GetSourcesArgs,
  GetSourceByIdReturn,
  GetSourcesReturn,
  CreateSourceReturn,
  UpdateSourceReturn,
} from './sources'
import { callGetSourceByIdAPI, callGetSourcesAPI, callCreateSourceAPI, callUpdateSourceAPI } from './api'

export const getSourceById = (args: GetSourceByIdArgs, context: ServerContext): GetSourceByIdReturn => {
  const traceId = context.traceId
  logger.info('getSourceById', { traceId, args })
  const source = callGetSourceByIdAPI(args, context)
  return source
}

export const getSources = (args: GetSourcesArgs, context: ServerContext): GetSourcesReturn => {
  const traceId = context.traceId
  logger.info('getSources', { traceId, args })
  const sources = callGetSourcesAPI(args, context)
  return sources
}

export const createSource = (args: CreateSourceArgs, context: ServerContext): CreateSourceReturn => {
  const traceId = context.traceId
  logger.info('createSource', { traceId, args })
  const createResult = callCreateSourceAPI(args, context)
  return createResult
}

export const updateSource = (args: UpdateSourceArgs, context: ServerContext): UpdateSourceReturn => {
  const traceId = context.traceId
  logger.info('updateSource', { traceId, args })
  const updateResult = callUpdateSourceAPI({ ...args }, context)
  return updateResult
}

const sourceServices = {
  getSourceById,
  getSources,
  createSource,
  updateSource,
}

export default sourceServices
