import { callGetTaskByIdAPI, callGetTasksAPI, callCreateTaskAPI, callUpdateTaskAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateTaskArgs } from '../__stubs__/mock-create-task'
import { mockUpdateTaskArgs } from '../__stubs__/mock-update-task'
import { getTaskById, getTasks, createTask, updateTask } from '../services'
import { mockTask } from '../__stubs__/mock-task'
import { mockTasks } from '../__stubs__/mock-tasks'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetTaskByIdAPI: jest.fn(() => Promise.resolve(mockTask)),
  callGetTasksAPI: jest.fn(() => Promise.resolve(mockTasks)),
  callCreateTaskAPI: jest.fn(() => Promise.resolve(mockTask)),
  callUpdateTaskAPI: jest.fn(() => Promise.resolve(mockTask)),
}))

describe('getTaskById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getTaskById(args, mockContext)
    expect(callGetTaskByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTask)
  })
})

describe('getTasks', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getTasks(args, mockContext)
    expect(callGetTasksAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTasks)
  })
})

describe('createTask', () => {
  it('should return correctly', async () => {
    const result = await createTask(mockCreateTaskArgs, mockContext)
    expect(callCreateTaskAPI).toHaveBeenCalledWith(mockCreateTaskArgs, mockContext)
    expect(result).toEqual(mockTask)
  })
})

describe('updateTask', () => {
  it('should return correctly', async () => {
    const result = await updateTask(mockUpdateTaskArgs, mockContext)
    expect(callUpdateTaskAPI).toHaveBeenCalledWith(mockUpdateTaskArgs, mockContext)
    expect(result).toEqual(mockTask)
  })
})
