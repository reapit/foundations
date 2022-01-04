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
  const source = callGetSourceByIdAPI(args, context)
  return source
}

export const getSources = (args: GetSourcesArgs, context: ServerContext): GetSourcesReturn => {
  const sources = callGetSourcesAPI(args, context)
  return sources
}

export const createSource = (args: CreateSourceArgs, context: ServerContext): CreateSourceReturn => {
  const createResult = callCreateSourceAPI(args, context)
  return createResult
}

export const updateSource = (args: UpdateSourceArgs, context: ServerContext): UpdateSourceReturn => {
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
