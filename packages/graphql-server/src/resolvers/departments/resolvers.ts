import departmentServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetDepartmentByIdArgs,
  GetDepartmentsArgs,
  QueryGetDepartmentByIdReturn,
  QueryGetDepartmentsReturn,
} from './departments'

export const queryGetDepartmentById = (
  _: any,
  args: GetDepartmentByIdArgs,
  context: ServerContext,
): QueryGetDepartmentByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetDepartmentById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return departmentServices.getDepartmentById(args, context)
}

export const queryGetDepartments = (
  _: any,
  args: GetDepartmentsArgs,
  context: ServerContext,
): QueryGetDepartmentsReturn => {
  const traceId = context.traceId
  logger.info('queryGetDepartments', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return departmentServices.getDepartments(args, context)
}

export default {
  Query: {
    GetDepartmentById: queryGetDepartmentById,
    GetDepartments: queryGetDepartments,
  },
}
