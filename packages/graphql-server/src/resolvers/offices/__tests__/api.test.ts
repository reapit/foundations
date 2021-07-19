import { mockContext } from '../../../__stubs__/mock-context'
import { callGetOfficesAPI, callCreateOfficeAPI, callUpdateOfficeAPI, callGetOfficeByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockOffice } from '../__stubs__/mock-office'
import { mockOffices } from '../__stubs__/mock-offices'
import { mockCreateOfficeArgs } from '../__stubs__/mock-create-office'
import { mockUpdateOfficeArgs } from '../__stubs__/mock-update-office'
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
      get: jest.fn(() => Promise.resolve({ data: mockOffices })),
    })
    const args = { pageSize: 1 }
    const result = await callGetOfficesAPI(args, mockContext)
    expect(result).toEqual(mockOffices)
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
      get: jest.fn(() => Promise.resolve({ data: mockOffice })),
    })
    const args = { id: mockOffice.id } as any
    const result = await callGetOfficeByIdAPI(args, mockContext)
    expect(result).toEqual(mockOffice)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockOffice.id } as any
    const result = await callGetOfficeByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateOfficeAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockOffice })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockOffice.id)
    await callCreateOfficeAPI(mockCreateOfficeArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateOfficeAPI(mockCreateOfficeArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateOfficeAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateOfficeAPI(mockUpdateOfficeArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateOfficeAPI(mockUpdateOfficeArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
