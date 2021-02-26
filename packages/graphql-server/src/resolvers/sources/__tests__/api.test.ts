import { mockContext } from '../../../__stubs__/context'
import { callGetSourcesAPI, callCreateSourceAPI, callUpdateSourceAPI, callGetSourceByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { sourcesMock } from '../__stubs__/sources'
import { sourceMock } from '../__stubs__/source'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'
import { createSourceArgsMock } from '../__stubs__/create-source'
import { updateSourceArgsMock } from '../__stubs__/update-source'
import { URLS } from '../../../constants/api'

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
    get: jest.fn().mockImplementation((value) => {
      if (value === `${URLS.sources}/id`) {
        return {
          data: sourceMock,
        }
      }
      return {
        data: sourcesMock,
      }
    }),
    post: jest.fn().mockImplementation(() => sourceMock),
    patch: jest.fn().mockImplementation(() => sourceMock),
  })),
}))

describe('callGetSourcesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: sourcesMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetSourcesAPI(args, mockContext)
    expect(result).toEqual(sourcesMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetSourcesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetSourceByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: sourceMock })),
    })
    const args = { id: sourceMock.id }
    const result = await callGetSourceByIdAPI(args, mockContext)
    expect(result).toEqual(sourceMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: sourceMock.id }
    const result = await callGetSourceByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateSourceAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: sourceMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(sourceMock.id)
    await callCreateSourceAPI(createSourceArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateSourceAPI(createSourceArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateSourceAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    const result = await callUpdateSourceAPI(updateSourceArgsMock, mockContext)
    expect(result).toEqual(sourceMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateSourceAPI(updateSourceArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
