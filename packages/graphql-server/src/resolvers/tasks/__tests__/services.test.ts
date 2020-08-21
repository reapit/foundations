import { callGetTaskByIdAPI, callGetTasksAPI, callCreateTaskAPI, callUpdateTaskAPI } from '../api'
import { mockContext } from '../../../__stubs__/context'
import { createTaskArgsMock } from '../__stubs__/create-task'
import { updateTaskArgsMock } from '../__stubs__/update-task'
import { getTaskById, getTasks, createTask, updateTask } from '../services'
import { taskMock } from '../__stubs__/task'
import { tasksMock } from '../__stubs__/tasks'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetTaskByIdAPI: jest.fn(() => Promise.resolve(taskMock)),
  callGetTasksAPI: jest.fn(() => Promise.resolve(tasksMock)),
  callCreateTaskAPI: jest.fn(() => Promise.resolve(taskMock)),
  callUpdateTaskAPI: jest.fn(() => Promise.resolve(taskMock)),
}))

describe('getTaskById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getTaskById(args, mockContext)
    expect(callGetTaskByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(taskMock)
  })
})

describe('getTasks', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getTasks(args, mockContext)
    expect(callGetTasksAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(tasksMock)
  })
})

describe('createTask', () => {
  it('should return correctly', async () => {
    const result = await createTask(createTaskArgsMock, mockContext)
    expect(callCreateTaskAPI).toHaveBeenCalledWith(createTaskArgsMock, mockContext)
    expect(result).toEqual(taskMock)
  })
})

describe('updateTask', () => {
  it('should return correctly', async () => {
    const result = await updateTask(updateTaskArgsMock, mockContext)
    expect(callUpdateTaskAPI).toHaveBeenCalledWith(updateTaskArgsMock, mockContext)
    expect(result).toEqual(taskMock)
  })
})
