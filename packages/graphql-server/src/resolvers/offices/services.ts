import { ServerContext } from '../../utils'
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
  const office = callGetOfficeByIdAPI(args, context)
  return office
}

export const getOffices = (args: GetOfficesArgs, context: ServerContext): GetOfficesReturn => {
  const offices = callGetOfficesAPI(args, context)
  return offices
}

export const createOffice = (args: CreateOfficeArgs, context: ServerContext): CreateOfficeReturn => {
  const createResult = callCreateOfficeAPI(args, context)
  return createResult
}

export const updateOffice = (args: UpdateOfficeArgs, context: ServerContext): UpdateOfficeReturn => {
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
