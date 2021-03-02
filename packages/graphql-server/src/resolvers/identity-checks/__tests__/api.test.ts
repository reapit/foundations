import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetIdentityChecksAPI,
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
  callGetIdentityCheckByIdAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { identityCheckMock } from '../__stubs__/mock-identity-check'
import { identityChecksMock } from '../__stubs__/mock-identity-checks'
import { createIdentityCheckArgsMock } from '../__stubs__/mock-create-identity-check'
import { updateIdentityCheckArgsMock } from '../__stubs__/mock-update-identity-check'
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

describe('callGetIdentityChecksAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: identityChecksMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetIdentityChecksAPI(args, mockContext)
    expect(result).toEqual(identityChecksMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetIdentityChecksAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetIdentityCheckByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: identityCheckMock })),
    })
    const args = { id: identityCheckMock.id }
    const result = await callGetIdentityCheckByIdAPI(args, mockContext)
    expect(result).toEqual(identityCheckMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: identityCheckMock.id }
    const result = await callGetIdentityCheckByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateIdentityCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: identityCheckMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(identityCheckMock.id)
    await callCreateIdentityCheckAPI(createIdentityCheckArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateIdentityCheckAPI(createIdentityCheckArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateIdentityCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateIdentityCheckAPI(updateIdentityCheckArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateIdentityCheckAPI(updateIdentityCheckArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
