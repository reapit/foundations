import { callGetWorksOrderByIdAPI, callGetWorksOrders, callCreateWorksOrder } from '../api'
import { mockContext } from '../../../__stubs__/context'
import { worksOrderList, worksOrder, getWorksOrderByIdArgs } from '../__stubs__/works-orders-query'
import { getWorksOrders, getWorkOrderById, createWorksOrder } from '../services'
import { createWorksOrderArgs } from '../__stubs__/works-orders-mutation'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrderByIdAPI: jest.fn(() => Promise.resolve(worksOrder)),
  callGetWorksOrders: jest.fn(() => Promise.resolve(worksOrderList)),
  callCreateWorksOrder: jest.fn(() => Promise.resolve(worksOrder)),
}))

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = createWorksOrderArgs
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrder).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrder)
  })
})

describe('getWorksOrders', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getWorksOrders(args, mockContext)
    expect(callGetWorksOrders).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
})

describe('getWorkOrderById', () => {
  it('should return correctly', async () => {
    const args = getWorksOrderByIdArgs
    const result = await getWorkOrderById(args, mockContext)
    expect(callGetWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrder)
  })
})
