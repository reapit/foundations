import officeServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  UpdateOfficeArgs,
  GetOfficesArgs,
  CreateOfficeArgs,
  GetOfficeArgs,
  QueryOfficeReturn,
  QueryOfficesReturn,
  MutationCreateOfficeReturn,
  MutationUpdateOfficeReturn,
} from './offices'

export const queryOffice = (_: any, args: GetOfficeArgs, context: ServerContext): QueryOfficeReturn => {
  const traceId = context.traceId

  logger.info('queryOffice', { traceId, args })

  const isPermit = checkPermission(context)

  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return officeServices.getOfficeById(args, context)
}

export const queryOffices = (_: any, args: GetOfficesArgs, context: ServerContext): QueryOfficesReturn => {
  const traceId = context.traceId

  logger.info('queryOffices', { traceId, args })

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

  logger.info('mutationCreateOffice', { traceId, args })

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

  logger.info('mutationUpdateOffice', { traceId, args })

  const isPermit = checkPermission(context)

  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return officeServices.updateOffice(args, context)
}
