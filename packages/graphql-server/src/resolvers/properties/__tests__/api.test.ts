import { mockContext } from '../../../__stubs__/context'
import { callGetPropertiesAPI, callCreatePropertyAPI, callUpdatePropertyAPI, callGetPropertyByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { propertyMock } from '../__stubs__/property'
import { propertiesMock } from '../__stubs__/properties'
import { createPropertyArgsMock } from '../__stubs__/create-property'
import { updatePropertyArgsMock } from '../__stubs__/update-property'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

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
      get: jest.fn(() => Promise.resolve({ data: propertiesMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetPropertiesAPI(args, mockContext)
    expect(result).toEqual(propertiesMock)
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
      get: jest.fn(() => Promise.resolve({ data: propertyMock })),
    })
    const args = { id: propertyMock.id }
    const result = await callGetPropertyByIdAPI(args, mockContext)
    expect(result).toEqual(propertyMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: propertyMock.id }
    const result = await callGetPropertyByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreatePropertyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: propertyMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(propertyMock.id)
    await callCreatePropertyAPI(createPropertyArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreatePropertyAPI(createPropertyArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdatePropertyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdatePropertyAPI(updatePropertyArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdatePropertyAPI(updatePropertyArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
