import logger from '../../logger'
import { ServerContext } from '../../index'
import { GetDepartmentByIdArgs, GetDepartmentsArgs, GetDepartmentByIdReturn, GetDepartmentsReturn } from './departments'
import { callGetDepartmentByIdAPI, callGetDepartmentsAPI } from './api'

export const getDepartmentById = (args: GetDepartmentByIdArgs, context: ServerContext): GetDepartmentByIdReturn => {
  const traceId = context.traceId
  logger.info('getDepartmentById', { traceId, args })
  const property = callGetDepartmentByIdAPI(args, context)
  return property
}

export const getDepartments = (args: GetDepartmentsArgs, context: ServerContext): GetDepartmentsReturn => {
  const traceId = context.traceId
  logger.info('getDepartments', { traceId, args })
  const properties = callGetDepartmentsAPI(args, context)
  return properties
}

const propertyServices = {
  getDepartmentById,
  getDepartments,
}

export default propertyServices
