import officeServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetOfficeByIdArgs,
  CreateOfficeArgs,
  GetOfficesArgs,
  UpdateOfficeArgs,
  QueryGetOfficeByIdReturn,
  QueryGetOfficesReturn,
  MutationCreateOfficeReturn,
  MutationUpdateOfficeReturn,
} from './offices'

export const queryGetOfficeById = (
  _: any,
  args: GetOfficeByIdArgs,
  context: ServerContext,
): QueryGetOfficeByIdReturn => {
  const traceId = context.traceId
  logger.info('queryOffice', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return officeServices.getOfficeById(args, context)
}

export const queryGetOffices = (_: any, args: GetOfficesArgs, context: ServerContext): QueryGetOfficesReturn => {
  const traceId = context.traceId
  logger.info('offices', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return officeServices.getOffices(args, context)
}

export const mutationCreateOffice = (
  _: any,
  args: CreateOfficeArgs,
  context: ServerContext,
): MutationCreateOfficeReturn => {
  const traceId = context.traceId
  logger.info('createOffice', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return officeServices.createOffice(args, context)
}

export const mutationUpdateOffice = (
  _: any,
  args: UpdateOfficeArgs,
  context: ServerContext,
): MutationUpdateOfficeReturn => {
  const traceId = context.traceId
  logger.info('updateOffice', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return officeServices.updateOffice(args, context)
}

export default {
  Query: {
    GetOfficeById: queryGetOfficeById,
    GetOffices: queryGetOffices,
  },
  Mutation: {
    CreateOffice: mutationCreateOffice,
    UpdateOffice: mutationUpdateOffice,
  },
}
