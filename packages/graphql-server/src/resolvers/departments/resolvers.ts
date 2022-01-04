import departmentServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetDepartmentByIdArgs,
  GetDepartmentsArgs,
  QueryGetDepartmentByIdReturn,
  QueryGetDepartmentsReturn,
} from './departments'

export const queryGetDepartmentById = resolverHandler<GetDepartmentByIdArgs, QueryGetDepartmentByIdReturn>(
  (_: any, args: GetDepartmentByIdArgs, context: ServerContext): QueryGetDepartmentByIdReturn => {
    return departmentServices.getDepartmentById(args, context)
  },
)

export const queryGetDepartments = resolverHandler<GetDepartmentsArgs, QueryGetDepartmentsReturn>(
  (_: any, args: GetDepartmentsArgs, context: ServerContext): QueryGetDepartmentsReturn => {
    return departmentServices.getDepartments(args, context)
  },
)

export default {
  Query: {
    GetDepartmentById: queryGetDepartmentById,
    GetDepartments: queryGetDepartments,
  },
}
