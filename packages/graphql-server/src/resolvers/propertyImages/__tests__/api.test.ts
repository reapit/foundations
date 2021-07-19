import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetPropertyImagesAPI,
  callGetPropertyImageByIdAPI,
  callCreatePropertyImageAPI,
  callDeletePropertyImageAPI,
  callUpdatePropertyImageAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockPropertyImage } from '../__stubs__/mock-property-image'
import { mockPropertyImages } from '../__stubs__/mock-property-images'
import { mockCreatePropertyImageArgs } from '../__stubs__/mock-create-property-image'
import { mockDeletePropertyImageArgs } from '../__stubs__/mock-delete-property-image'
import { mockUpdatePropertyImageArgs } from '../__stubs__/mock-update-property-image'
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

describe('callGetPropertyImagesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockPropertyImages })),
    })
    const args = { pageSize: 1 }
    const result = await callGetPropertyImagesAPI(args, mockContext)
    expect(result).toEqual(mockPropertyImages)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetPropertyImagesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetPropertyImageByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockPropertyImage })),
    })
    const args = { id: mockPropertyImage.id }
    const result = await callGetPropertyImageByIdAPI(args, mockContext)
    expect(result).toEqual(mockPropertyImage)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockPropertyImage.id }
    const result = await callGetPropertyImageByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreatePropertyImageAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockPropertyImage })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockPropertyImage.id)
    await callCreatePropertyImageAPI(mockCreatePropertyImageArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreatePropertyImageAPI(mockCreatePropertyImageArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdatePropertyImageAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdatePropertyImageAPI(mockUpdatePropertyImageArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdatePropertyImageAPI(mockUpdatePropertyImageArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeletePropertyImageAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeletePropertyImageAPI(mockDeletePropertyImageArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeletePropertyImageAPI(mockDeletePropertyImageArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
