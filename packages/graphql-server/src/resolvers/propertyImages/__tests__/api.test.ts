import { mockContext } from '../../../__stubs__/context'
import {
  callGetPropertyImagesAPI,
  callGetPropertyImageByIdAPI,
  callCreatePropertyImageAPI,
  callDeletePropertyImageAPI,
  callUpdatePropertyImageAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { propertyImageMock } from '../__stubs__/propertyImage'
import { propertyImagesMock } from '../__stubs__/propertyImages'
import { createPropertyImageArgsMock } from '../__stubs__/create-property-image'
import { deletePropertyImageArgsMock } from '../__stubs__/delete-property-image'
import { updatePropertyImageArgsMock } from '../__stubs__/update-property-image'
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
      get: jest.fn(() => Promise.resolve({ data: propertyImagesMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetPropertyImagesAPI(args, mockContext)
    expect(result).toEqual(propertyImagesMock)
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
      get: jest.fn(() => Promise.resolve({ data: propertyImageMock })),
    })
    const args = { id: propertyImageMock.id }
    const result = await callGetPropertyImageByIdAPI(args, mockContext)
    expect(result).toEqual(propertyImageMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: propertyImageMock.id }
    const result = await callGetPropertyImageByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreatePropertyImageAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: propertyImageMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(propertyImageMock.id)
    await callCreatePropertyImageAPI(createPropertyImageArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreatePropertyImageAPI(createPropertyImageArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdatePropertyImageAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdatePropertyImageAPI(updatePropertyImageArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdatePropertyImageAPI(updatePropertyImageArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeletePropertyImageAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeletePropertyImageAPI(deletePropertyImageArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeletePropertyImageAPI(deletePropertyImageArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
