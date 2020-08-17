import { mockContext } from '../../../__stubs__/context'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { worksOrderList, getWorksOrderByIdArgs, worksOrder } from '../__stubs__/works-orders-query'
import { callGetWorksOrderByIdAPI, callGetWorksOrders, callCreateWorksOrder } from '../api'
import { createWorksOrderArgs } from '../__stubs__/works-orders-mutation'
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

describe('callCreateWorksOrder', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: worksOrder })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(worksOrder.id)
    await callCreateWorksOrder(createWorksOrderArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateWorksOrder(createWorksOrderArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrderByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: worksOrderList })),
    })
    const args = getWorksOrderByIdArgs
    const result = await callGetWorksOrderByIdAPI(args, mockContext)

    expect(result).toEqual(worksOrderList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = getWorksOrderByIdArgs
    const result = await callGetWorksOrderByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrders', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: worksOrderList })),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrders(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrders(args, mockContext)
    expect(result).toEqual('caught error')
  })
})
