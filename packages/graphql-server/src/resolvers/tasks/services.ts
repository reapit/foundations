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
  const property = callGetTaskByIdAPI(args, context)
  return property
}

export const getTasks = (args: GetTasksArgs, context: ServerContext): GetTasksReturn => {
  const tasks = callGetTasksAPI(args, context)
  return tasks
}

export const createTask = (args: CreateTaskArgs, context: ServerContext): CreateTaskReturn => {
  const createResult = callCreateTaskAPI(args, context)
  return createResult
}

export const updateTask = (args: UpdateTaskArgs, context: ServerContext): UpdateTaskReturn => {
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
