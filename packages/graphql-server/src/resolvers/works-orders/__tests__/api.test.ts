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
  callCreateWorksOrderdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
  callGetWorksOrderItemByIdAPI,
  callCreateWorksOrderItemAPI,
  callUpdateWorksOrderItemAPI,
  calldeleteWorksOrderItem,
} from '../api'
import {
  createWorksOrderArgsStub,
  updateWorkOrderArgsStub,
  createWorksOrderItemArgsStub,
  updateWorksOrderItemArgsStub,
  deleteWorksOrderItemArgsStub,
} from '../__stubs__/works-orders-mutation'
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

describe('calldeleteWorksOrderItem', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await calldeleteWorksOrderItem(deleteWorksOrderItemArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await calldeleteWorksOrderItem(deleteWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateWorksOrderItemAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await callUpdateWorksOrderItemAPI(updateWorksOrderItemArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await callUpdateWorksOrderItemAPI(updateWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateWorksOrderItemAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await callCreateWorksOrderItemAPI(createWorksOrderItemArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await callCreateWorksOrderItemAPI(createWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

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

describe('callCreateWorksOrderdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: worksOrderStub })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(worksOrderStub.id)
    await callCreateWorksOrderdAPI(createWorksOrderArgsStub, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateWorksOrderdAPI(createWorksOrderArgsStub, mockContext)
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
