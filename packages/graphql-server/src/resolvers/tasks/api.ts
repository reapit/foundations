import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  GetTaskByIdArgs,
  CreateTaskArgs,
  UpdateTaskArgs,
  GetTasksArgs,
  GetTaskByIdReturn,
  GetTasksReturn,
  CreateTaskReturn,
  UpdateTaskReturn,
} from './tasks'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetTaskByIdAPI = async (args: GetTaskByIdArgs, context: ServerContext): GetTaskByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetTaskByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetTaskByIdReturn>(`${URLS.tasks}/${id}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTaskByIdAPI' })
    return handleErrorResult
  }
}

export const callGetTasksAPI = async (args: GetTasksArgs, context: ServerContext): GetTasksReturn => {
  const traceId = context.traceId
  logger.info('callGetTasksAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetTasksReturn>(`${URLS.tasks}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetTasksAPI' })
    return handleErrorResult
  }
}

export const callCreateTaskAPI = async (args: CreateTaskArgs, context: ServerContext): CreateTaskReturn => {
  const traceId = context.traceId
  logger.info('callCreateTaskAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateTaskReturn>(URLS.tasks, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetTaskByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateTaskAPI' })
    return handleErrorResult
  }
}

export const callUpdateTaskAPI = async (args: UpdateTaskArgs, context: ServerContext): UpdateTaskReturn => {
  const traceId = context.traceId
  logger.info('callUpdateTaskAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateTaskReturn>(
      `${URLS.tasks}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse.status === 204) {
      return callGetTaskByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateTaskAPI' })
    return handleErrorResult
  }
}
