/*
 * TODOME(callGetWorksOrdersByIdAPI)
 * import instance
 * import stub
 *
 * mock
 *
 * describe
 * test normal
 * test error
 */

import { mockContext } from '../../../__stubs__/context'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { worksOrderList } from '../__stubs__/works-orders-query'
import { callGetWorksOrdersByIdAPI } from '../api'

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

describe('callGetWorksOrdersByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: worksOrderList })),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrdersByIdAPI(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrdersByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})
