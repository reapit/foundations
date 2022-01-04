import { ServerContext } from '../../utils'
import { GetDepartmentByIdArgs, GetDepartmentsArgs, GetDepartmentByIdReturn, GetDepartmentsReturn } from './departments'
import { callGetDepartmentByIdAPI, callGetDepartmentsAPI } from './api'

export const getDepartmentById = (args: GetDepartmentByIdArgs, context: ServerContext): GetDepartmentByIdReturn => {
  const department = callGetDepartmentByIdAPI(args, context)
  return department
}

export const getDepartments = (args: GetDepartmentsArgs, context: ServerContext): GetDepartmentsReturn => {
  const departments = callGetDepartmentsAPI(args, context)
  return departments
}

const departmentServices = {
  getDepartmentById,
  getDepartments,
}

export default departmentServices
