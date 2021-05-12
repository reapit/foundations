import propertyServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../utils'
import {
  GetTaskByIdArgs,
  CreateTaskArgs,
  GetTasksArgs,
  UpdateTaskArgs,
  QueryGetTaskByIdReturn,
  QueryGetTasksReturn,
  MutationCreateTaskReturn,
  MutationUpdateTaskReturn,
} from './tasks'

export const queryGetTaskById = (_: any, args: GetTaskByIdArgs, context: ServerContext): QueryGetTaskByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetTaskById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getTaskById(args, context)
}

export const queryGetTasks = (_: any, args: GetTasksArgs, context: ServerContext): QueryGetTasksReturn => {
  const traceId = context.traceId
  logger.info('queryGetTasks', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.getTasks(args, context)
}

export const mutationCreateTask = (_: any, args: CreateTaskArgs, context: ServerContext): MutationCreateTaskReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateTask', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.createTask(args, context)
}

export const mutationUpdateTask = (_: any, args: UpdateTaskArgs, context: ServerContext): MutationUpdateTaskReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateTask', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return propertyServices.updateTask(args, context)
}

export default {
  Query: {
    GetTaskById: queryGetTaskById,
    GetTasks: queryGetTasks,
  },
  Mutation: {
    CreateTask: mutationCreateTask,
    UpdateTask: mutationUpdateTask,
  },
}
