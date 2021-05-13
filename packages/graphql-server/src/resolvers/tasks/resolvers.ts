import propertyServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
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

export const queryGetTaskById = resolverHandler<GetTaskByIdArgs, QueryGetTaskByIdReturn>((_: any, args: GetTaskByIdArgs, context: ServerContext): QueryGetTaskByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetTaskById', { traceId, args })
  return propertyServices.getTaskById(args, context)
})

export const queryGetTasks = resolverHandler<GetTasksArgs, QueryGetTasksReturn>((_: any, args: GetTasksArgs, context: ServerContext): QueryGetTasksReturn => {
  const traceId = context.traceId
  logger.info('queryGetTasks', { traceId, args })
  return propertyServices.getTasks(args, context)
})

export const mutationCreateTask = resolverHandler<CreateTaskArgs, MutationCreateTaskReturn>((_: any, args: CreateTaskArgs, context: ServerContext): MutationCreateTaskReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateTask', { traceId, args })
  return propertyServices.createTask(args, context)
})

export const mutationUpdateTask = resolverHandler<UpdateTaskArgs, MutationUpdateTaskReturn>((_: any, args: UpdateTaskArgs, context: ServerContext): MutationUpdateTaskReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateTask', { traceId, args })
  return propertyServices.updateTask(args, context)
})

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
