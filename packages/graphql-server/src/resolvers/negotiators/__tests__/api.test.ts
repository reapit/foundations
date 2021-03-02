import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
  callGetNegotiatorByIdAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { negotiatorMock } from '../__stubs__/mock-negotiator'
import { negotiatorsMock } from '../__stubs__/mock-negotiators'
import { createNegotiatorArgsMock } from '../__stubs__/mock-create-negotiator'
import { updateNegotiatorArgsMock } from '../__stubs__/mock-update-negotiator'
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

describe('callGetNegotiatorsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: negotiatorsMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetNegotiatorsAPI(args, mockContext)
    expect(result).toEqual(negotiatorsMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetNegotiatorsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetNegotiatorByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: negotiatorMock })),
    })
    const args = { id: negotiatorMock.id }
    const result = await callGetNegotiatorByIdAPI(args, mockContext)
    expect(result).toEqual(negotiatorMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: negotiatorMock.id }
    const result = await callGetNegotiatorByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateNegotiatorAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: negotiatorMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(negotiatorMock.id)
    await callCreateNegotiatorAPI(createNegotiatorArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateNegotiatorAPI(createNegotiatorArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateNegotiatorAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateNegotiatorAPI(updateNegotiatorArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateNegotiatorAPI(updateNegotiatorArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
