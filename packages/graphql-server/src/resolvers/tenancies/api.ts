import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetTenancyByIdArgs,
  GetTenancyByIdReturn,
  GetTenanciesArgs,
  GetTenanciesReturn,
  GetTenancyRelationshipsArgs,
  GetTenancyRelationshipsReturn,
  GetTenancyChecksArgs,
  GetTenancyChecksReturn,
  GetTenancyCheckByIdArgs,
  GetTenancyCheckByIdReturn,
  CreateTenancyArgs,
  CreateTenancyReturn,
  CreateTenancyCheckArgs,
  CreateTenancyCheckReturn,
  DeleteTenancyCheckArgs,
  DeleteTenancyCheckReturn,
  UpdateTenancyCheckArgs,
  UpdateTenancyCheckReturn,
} from './tenancies'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetTenancyByIdAPI = async (args: GetTenancyByIdArgs, context: ServerContext): GetTenancyByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetTenancyByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetTenancyByIdReturn>(`${URLS.tenancies}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTenancyByIdAPI' })

    return handleErrorResult
  }
}

export const callGetTenanciesAPI = async (args: GetTenanciesArgs, context: ServerContext): GetTenanciesReturn => {
  const traceId = context.traceId
  logger.info('callGetTenanciesAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetTenanciesReturn>(`${URLS.tenancies}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTenanciseAPI' })
    return handleErrorResult
  }
}

export const callGetTenancyRelationshipsAPI = async (
  args: GetTenancyRelationshipsArgs,
  context: ServerContext,
): GetTenancyRelationshipsReturn => {
  const traceId = context.traceId
  logger.info('callGetTenancyRelationshipsAPI', { args, traceId })
  try {
    const { id, ...paramsObj } = args
    const params = qs.stringify(paramsObj)
    const response = await createPlatformAxiosInstance().get<GetTenancyRelationshipsReturn>(
      `${URLS.tenancies}/${id}/relationships?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTenancyRelationshipsAPI' })
    return handleErrorResult
  }
}

export const callGetTenancyChecksAPI = async (
  args: GetTenancyChecksArgs,
  context: ServerContext,
): GetTenancyChecksReturn => {
  const traceId = context.traceId
  logger.info('callGetTenancyChecksAPI', { args, traceId })
  try {
    const { id, ...paramsObj } = args
    const params = qs.stringify(paramsObj)
    const response = await createPlatformAxiosInstance().get<GetTenancyChecksReturn>(
      `${URLS.tenancies}/${id}/checks?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTenancyChecksAPI' })
    return handleErrorResult
  }
}

export const callGetTenancyCheckByIdAPI = async (
  args: GetTenancyCheckByIdArgs,
  context: ServerContext,
): GetTenancyCheckByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetTenancyCheckByIdAPI', { args, traceId })
  try {
    const { id, checkId } = args
    const response = await createPlatformAxiosInstance().get<GetTenancyCheckByIdReturn>(
      `${URLS.tenancies}/${id}/checks/${checkId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTenancyCheckByIdAPI' })
    return handleErrorResult
  }
}

export const callCreateTenancyAPI = async (args: CreateTenancyArgs, context: ServerContext): CreateTenancyReturn => {
  const traceId = context.traceId
  logger.info('callCreateTenancyAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateTenancyReturn>(URLS.tenancies, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetTenancyByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateTenancyAPI' })
    return handleErrorResult
  }
}

export const callCreateTenancyCheckAPI = async (
  args: CreateTenancyCheckArgs,
  context: ServerContext,
): CreateTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('callCreateTenancyCheckAPI', { traceId, args })
  try {
    const { id, ...payload } = args
    const response = await createPlatformAxiosInstance().post<CreateTenancyCheckReturn>(
      `${URLS.tenancies}/${id}/checks`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    const checkId = getIdFromCreateHeaders({ headers: response.headers })
    if (checkId) {
      return callGetTenancyCheckByIdAPI({ id, checkId }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateTenancyCheckAPI' })
    return handleErrorResult
  }
}

export const callDeleteTenancyCheckAPI = async (
  args: DeleteTenancyCheckArgs,
  context: ServerContext,
): DeleteTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('callDeleteTenancyCheckAPI', { traceId, args })
  try {
    const { checkId, id } = args
    await createPlatformAxiosInstance().delete<DeleteTenancyCheckReturn>(`${URLS.tenancies}/${id}/checks/${checkId}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return true
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteTenancyCheckAPI' })
    return handleErrorResult
  }
}

export const callUpdateTenancyCheckAPI = async (
  args: UpdateTenancyCheckArgs,
  context: ServerContext,
): UpdateTenancyCheckReturn => {
  const traceId = context.traceId
  logger.info('callUpdateTenancyCheckAPI', { traceId, args })
  try {
    const { _eTag, id, checkId, ...payload } = args

    const updateResponse = await createPlatformAxiosInstance().patch<UpdateTenancyCheckReturn>(
      `${URLS.tenancies}/${id}/checks/${checkId}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetTenancyCheckByIdAPI({ id, checkId }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateTenancyCheckAPI' })
    return handleErrorResult
  }
}
