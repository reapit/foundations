import { mockContext } from '../../../__stubs__/mock-context'
import { callGetSourcesAPI, callCreateSourceAPI, callUpdateSourceAPI, callGetSourceByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockSources } from '../__stubs__/mock-sources'
import { mockSource } from '../__stubs__/mock-source'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'
import { mockCreateSourceArgs } from '../__stubs__/mock-create-source'
import { mockUpdateSourceArgs } from '../__stubs__/mock-update-source'

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
      if (value === '/sources/id') {
        return {
          data: mockSource,
        }
      }
      return {
        data: mockSources,
      }
    }),
    post: jest.fn().mockImplementation(() => mockSource),
    patch: jest.fn().mockImplementation(() => mockSource),
  })),
}))

describe('callGetSourcesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockSources })),
    })
    const args = { pageSize: 1 }
    const result = await callGetSourcesAPI(args, mockContext)
    expect(result).toEqual(mockSources)
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
      get: jest.fn(() => Promise.resolve({ data: mockSource })),
    })
    const args = { id: mockSource.id }
    const result = await callGetSourceByIdAPI(args, mockContext)
    expect(result).toEqual(mockSource)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockSource.id }
    const result = await callGetSourceByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateSourceAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockSource })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockSource.id)
    await callCreateSourceAPI(mockCreateSourceArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateSourceAPI(mockCreateSourceArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateSourceAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    const result = await callUpdateSourceAPI(mockUpdateSourceArgs, mockContext)
    expect(result).toEqual(mockSource)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateSourceAPI(mockUpdateSourceArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
