import { callGetWorksOrderByIdAPI } from '../api'
import { mockContext } from '../../../__stubs__/context'
import { worksOrderList, worksOrder, getWorksOrderByIdArgs } from '../__stubs__/works-orders-query'
import { getWorkOrders, getWorkOrderById } from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrderByIdAPI: jest.fn(() => Promise.resolve(worksOrderList)),
  callGetWorksOrders: jest.fn(() => Promise.resolve(worksOrder)),
}))

describe('getWorkOrders', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getWorkOrders(args, mockContext)
    expect(callGetWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
})

describe('getWorkOrderById', () => {
  it('should return correctly', async () => {
    const args = getWorksOrderByIdArgs
    const result = await getWorkOrderById(args, mockContext)
    expect(callGetWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
})
