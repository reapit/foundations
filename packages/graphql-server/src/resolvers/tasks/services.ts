import logger from '../../logger'
import { ServerContext } from '../../utils'
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
import { callGetTaskByIdAPI, callGetTasksAPI, callCreateTaskAPI, callUpdateTaskAPI } from './api'

export const getTaskById = (args: GetTaskByIdArgs, context: ServerContext): GetTaskByIdReturn => {
  const traceId = context.traceId
  logger.info('getTaskById', { traceId, args })
  const property = callGetTaskByIdAPI(args, context)
  return property
}

export const getTasks = (args: GetTasksArgs, context: ServerContext): GetTasksReturn => {
  const traceId = context.traceId
  logger.info('getTasks', { traceId, args })
  const tasks = callGetTasksAPI(args, context)
  return tasks
}

export const createTask = (args: CreateTaskArgs, context: ServerContext): CreateTaskReturn => {
  const traceId = context.traceId
  logger.info('createTask', { traceId, args })
  const createResult = callCreateTaskAPI(args, context)
  return createResult
}

export const updateTask = (args: UpdateTaskArgs, context: ServerContext): UpdateTaskReturn => {
  const traceId = context.traceId
  logger.info('updateTask', { traceId, args })
  const updateResult = callUpdateTaskAPI({ ...args }, context)
  return updateResult
}

const propertyServices = {
  getTaskById,
  getTasks,
  createTask,
  updateTask,
}

export default propertyServices
