import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetCompanyByIdArgs,
  CreateCompanyArgs,
  UpdateCompanyArgs,
  GetCompaniesArgs,
  GetCompanyByIdReturn,
  GetCompaniesReturn,
  CreateCompanyReturn,
  UpdateCompanyReturn,
  GetCompanyRolesArgs,
  GetCompanyRolesReturn,
} from './companies'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetCompanyByIdAPI = async (args: GetCompanyByIdArgs, context: ServerContext): GetCompanyByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetCompanyByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest)
    const response = await createPlatformAxiosInstance().get<GetCompanyByIdReturn>(
      `${URLS.companies}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetCompanyByIdAPI' })
    return handleErrorResult
  }
}

export const callGetCompaniesAPI = async (args: GetCompaniesArgs, context: ServerContext): GetCompaniesReturn => {
  const traceId = context.traceId
  logger.info('callGetCompaniesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetCompaniesReturn>(`${URLS.companies}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetCompaniesAPI' })
    return handleErrorResult
  }
}

export const callGetCompanyRolesAPI = async (
  args: GetCompanyRolesArgs,
  context: ServerContext,
): GetCompanyRolesReturn => {
  const traceId = context.traceId
  logger.info('callGetCompanyRolesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetCompanyRolesReturn>(`${URLS.companies}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetCompanyRolesAPI' })
    return handleErrorResult
  }
}

export const callCreateCompanyAPI = async (args: CreateCompanyArgs, context: ServerContext): CreateCompanyReturn => {
  const traceId = context.traceId
  logger.info('callCreateCompanyAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateCompanyReturn>(URLS.companies, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetCompanyByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateCompanyAPI' })
    return handleErrorResult
  }
}

export const callUpdateCompanyAPI = async (args: UpdateCompanyArgs, context: ServerContext): UpdateCompanyReturn => {
  const traceId = context.traceId
  logger.info('callUpdateCompanyAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateCompanyReturn>(
      `${URLS.companies}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse.status === 204) {
      return callGetCompanyByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateCompanyAPI' })
    return handleErrorResult
  }
}
