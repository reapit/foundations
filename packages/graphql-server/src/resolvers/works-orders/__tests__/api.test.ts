import { mockContext } from '../../../__stubs__/context'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import {
  worksOrderListStub,
  getWorksOrderByIdArgsStub,
  worksOrderStub,
  getWorksOrderItemByIdArgsStub,
} from '../__stubs__/works-orders-query'
import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderByIdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
  callGetWorksOrderItemByIdAPI,
} from '../api'
import { createWorksOrderArgsStub, updateWorkOrderArgsStub } from '../__stubs__/works-orders-mutation'
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

describe('callGetWorksOrderItemByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await callGetWorksOrderItemByIdAPI(getWorksOrderItemByIdArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await callGetWorksOrderItemByIdAPI(getWorksOrderItemByIdArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrderItemsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    const args = getWorksOrderByIdArgsStub
    await callGetWorksOrderItemsAPI(args, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const args = getWorksOrderByIdArgsStub
    const result = await callGetWorksOrderItemsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateWorksOrderAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateWorksOrderAPI(updateWorkOrderArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateWorksOrderAPI(updateWorkOrderArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateWorksOrderByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: worksOrderStub })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(worksOrderStub.id)
    await callCreateWorksOrderByIdAPI(createWorksOrderArgsStub, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateWorksOrderByIdAPI(createWorksOrderArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrderByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: worksOrderListStub })),
    })
    const args = getWorksOrderByIdArgsStub
    const result = await callGetWorksOrderByIdAPI(args, mockContext)

    expect(result).toEqual(worksOrderListStub)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = getWorksOrderByIdArgsStub
    const result = await callGetWorksOrderByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrdersAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: worksOrderListStub })),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrdersAPI(args, mockContext)
    expect(result).toEqual(worksOrderListStub)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrdersAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})
