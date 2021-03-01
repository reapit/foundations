import { mockContext } from '../../../__stubs__/mock-context'
import { callGetTasksAPI, callCreateTaskAPI, callUpdateTaskAPI, callGetTaskByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { taskMock } from '../__stubs__/mock-task'
import { tasksMock } from '../__stubs__/mock-tasks'
import { createTaskArgsMock } from '../__stubs__/mock-create-task'
import { updateTaskArgsMock } from '../__stubs__/mock-update-task'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

jest.mock('apollo-server-lambda', () => {
  return {}
})
jest.mock('../../../utils/get-id-from-create-headers', () => ({
  getIdFromCreateHeaders: jest.fn(),
}))

jest.mock('../../../utils/handle-error', () => ({
  handleError: jest.fn(() => Promise.resolve('caught error')),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}))

describe('callGetTasksAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: tasksMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetTasksAPI(args, mockContext)
    expect(result).toEqual(tasksMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetTasksAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetTaskByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: taskMock })),
    })
    const args = { id: taskMock.id }
    const result = await callGetTaskByIdAPI(args, mockContext)
    expect(result).toEqual(taskMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: taskMock.id }
    const result = await callGetTaskByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateTaskAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: taskMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(taskMock.id)
    await callCreateTaskAPI(createTaskArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateTaskAPI(createTaskArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateTaskAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateTaskAPI(updateTaskArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateTaskAPI(updateTaskArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
