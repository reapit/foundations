import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetOfficeByIdArgs,
  CreateOfficeArgs,
  UpdateOfficeArgs,
  GetOfficesArgs,
  GetOfficeByIdReturn,
  GetOfficesReturn,
  CreateOfficeReturn,
  UpdateOfficeReturn,
} from './offices'
import { callGetOfficeByIdAPI, callGetOfficesAPI, callCreateOfficeAPI, callUpdateOfficeAPI } from './api'

export const getOfficeById = (args: GetOfficeByIdArgs, context: ServerContext): GetOfficeByIdReturn => {
  const traceId = context.traceId
  logger.info('getOfficeById', { traceId, args })
  const office = callGetOfficeByIdAPI(args, context)
  return office
}

export const getOffices = async (args: GetOfficesArgs, context: ServerContext): GetOfficesReturn => {
  const traceId = context.traceId
  logger.info('getOffices', { traceId, args })
  const offices = await callGetOfficesAPI(args, context)
  return offices
}

export const createOffice = (args: CreateOfficeArgs, context: ServerContext): CreateOfficeReturn => {
  const traceId = context.traceId
  logger.info('createOffice', { traceId, args })
  const createResult = callCreateOfficeAPI(args, context)
  return createResult
}

export const updateOffice = (args: UpdateOfficeArgs, context: ServerContext): UpdateOfficeReturn => {
  const traceId = context.traceId
  logger.info('updateOffice', { traceId, args })
  const updateResult = callUpdateOfficeAPI({ ...args }, context)
  return updateResult
}

const officeServices = {
  getOfficeById,
  getOffices,
  createOffice,
  updateOffice,
}

export default officeServices
