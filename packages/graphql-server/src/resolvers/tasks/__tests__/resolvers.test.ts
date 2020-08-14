import tasksService from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetTaskById, queryGetTasks, mutationCreateTask, mutationUpdateTask } from '../resolvers'
import { createTaskArgsMock } from '../__stubs__/create-task'
import { updateTaskArgsMock } from '../__stubs__/update-task'
import { taskMock } from '../__stubs__/task'
import { tasksMock } from '../__stubs__/tasks'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getTaskById: jest.fn(() => taskMock),
  getTasks: jest.fn(() => tasksMock),
  createTask: jest.fn(() => true),
  updateTask: jest.fn(() => true),
  deleteTask: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetTaskById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetTaskById(null, args, mockContext)
    expect(result).toEqual(tasksService.getTaskById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetTaskById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetTasks', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetTasks(null, args, mockContext)
    expect(result).toEqual(tasksService.getTasks(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetTasks(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateTask', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateTask(null, createTaskArgsMock, mockContext)
    expect(result).toEqual(tasksService.createTask(createTaskArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateTask(null, createTaskArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateTask', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateTask(null, updateTaskArgsMock, mockContext)
    expect(result).toEqual(tasksService.updateTask(updateTaskArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateTask(null, updateTaskArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
