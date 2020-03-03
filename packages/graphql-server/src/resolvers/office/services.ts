import officeAPI from './api'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  CreateOfficeArgs,
  UpdateOfficeArgs,
  GetOfficeArgs,
  GetOfficesArgs,
  GetOfficesReturn,
  GetOfficeByIdReturn,
  CreateOfficeReturn,
  UpdateOfficeReturn,
} from './offices'

export const getOffices = (args: GetOfficesArgs, context: ServerContext): GetOfficesReturn => {
  const traceId = context.traceId

  logger.info('getOffices', { traceId, args })

  const offices = officeAPI.callGetOfficesAPI(args, context)

  return offices
}

export const getOfficeById = (args: GetOfficeArgs, context: ServerContext): GetOfficeByIdReturn => {
  const traceId = context.traceId

  logger.info('getOfficeById', { traceId, args })

  const office = officeAPI.callGetOfficeByIdAPI(args, context)

  return office
}

export const createOffice = (args: CreateOfficeArgs, context: ServerContext): CreateOfficeReturn => {
  const traceId = context.traceId

  logger.info('createOffice', { traceId, args })

  const office = officeAPI.callCreateOfficeAPI(args, context)

  return office
}

export const updateOffice = (args: UpdateOfficeArgs, context: ServerContext): UpdateOfficeReturn => {
  const traceId = context.traceId

  logger.info('updateOffice', { traceId, args })

  const office = officeAPI.callUpdateOfficeAPI(args, context)

  return office
}

const officeServices = {
  getOffices,
  createOffice,
  updateOffice,
  getOfficeById,
}

export default officeServices
