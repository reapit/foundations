import departmentServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetDepartmentByIdArgs,
  GetDepartmentsArgs,
  QueryGetDepartmentByIdReturn,
  QueryGetDepartmentsReturn,
} from './departments'

export const queryGetDepartmentById = resolverHandler<GetDepartmentByIdArgs, QueryGetDepartmentByIdReturn>(
  (_: any, args: GetDepartmentByIdArgs, context: ServerContext): QueryGetDepartmentByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetDepartmentById', { traceId, args })
    return departmentServices.getDepartmentById(args, context)
  },
)

export const queryGetDepartments = resolverHandler<GetDepartmentsArgs, QueryGetDepartmentsReturn>(
  (_: any, args: GetDepartmentsArgs, context: ServerContext): QueryGetDepartmentsReturn => {
    const traceId = context.traceId
    logger.info('queryGetDepartments', { traceId, args })
    return departmentServices.getDepartments(args, context)
  },
)

export default {
  Query: {
    GetDepartmentById: queryGetDepartmentById,
    GetDepartments: queryGetDepartments,
  },
}
