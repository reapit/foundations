import { mockContext } from '../../../__stubs__/mock-context'
import { callGetPropertiesAPI, callCreatePropertyAPI, callUpdatePropertyAPI, callGetPropertyByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockProperty } from '../__stubs__/mock-property'
import { mockProperties } from '../__stubs__/mock-properties'
import { mockCreatePropertyArgs } from '../__stubs__/mock-create-property'
import { mockUpdatePropertyArgs } from '../__stubs__/mock-update-property'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
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

describe('callGetPropertiesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockProperties })),
    })
    const args = { pageSize: 1 }
    const result = await callGetPropertiesAPI(args, mockContext)
    expect(result).toEqual(mockProperties)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetPropertiesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetPropertyByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockProperty })),
    })
    const args = { id: mockProperty.id } as any
    const result = await callGetPropertyByIdAPI(args, mockContext)
    expect(result).toEqual(mockProperty)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockProperty.id } as any
    const result = await callGetPropertyByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreatePropertyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockProperty })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockProperty.id)
    await callCreatePropertyAPI(mockCreatePropertyArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreatePropertyAPI(mockCreatePropertyArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdatePropertyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdatePropertyAPI(mockUpdatePropertyArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdatePropertyAPI(mockUpdatePropertyArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
