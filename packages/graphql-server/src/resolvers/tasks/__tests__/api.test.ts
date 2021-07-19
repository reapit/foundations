import { mockContext } from '../../../__stubs__/mock-context'
import { callGetTasksAPI, callCreateTaskAPI, callUpdateTaskAPI, callGetTaskByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockTask } from '../__stubs__/mock-task'
import { mockTasks } from '../__stubs__/mock-tasks'
import { mockCreateTaskArgs } from '../__stubs__/mock-create-task'
import { mockUpdateTaskArgs } from '../__stubs__/mock-update-task'
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
      get: jest.fn(() => Promise.resolve({ data: mockTasks })),
    })
    const args = { pageSize: 1 }
    const result = await callGetTasksAPI(args, mockContext)
    expect(result).toEqual(mockTasks)
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
      get: jest.fn(() => Promise.resolve({ data: mockTask })),
    })
    const args = { id: mockTask.id }
    const result = await callGetTaskByIdAPI(args, mockContext)
    expect(result).toEqual(mockTask)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockTask.id }
    const result = await callGetTaskByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateTaskAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockTask })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockTask.id)
    await callCreateTaskAPI(mockCreateTaskArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateTaskAPI(mockCreateTaskArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateTaskAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateTaskAPI(mockUpdateTaskArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateTaskAPI(mockUpdateTaskArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
