import { mockContext } from '../../../__stubs__/context'
import { callGetOfficesAPI, callCreateOfficeAPI, callUpdateOfficeAPI, callGetOfficeByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { officeMock } from '../__stubs__/office'
import { officesMock } from '../__stubs__/offices'
import { createOfficeArgsMock } from '../__stubs__/create-office'
import { updateOfficeArgsMock } from '../__stubs__/update-office'
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

describe('callGetOfficesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: officesMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetOfficesAPI(args, mockContext)
    expect(result).toEqual(officesMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetOfficesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetOfficeByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: officeMock })),
    })
    const args = { id: officeMock.id }
    const result = await callGetOfficeByIdAPI(args, mockContext)
    expect(result).toEqual(officeMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: officeMock.id }
    const result = await callGetOfficeByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateOfficeAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: officeMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(officeMock.id)
    await callCreateOfficeAPI(createOfficeArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateOfficeAPI(createOfficeArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateOfficeAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateOfficeAPI(updateOfficeArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateOfficeAPI(updateOfficeArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
