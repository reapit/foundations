import { callGetWorksOrdersByIdAPI } from '../api'
import { mockContext } from '../../../__stubs__/context'
import { worksOrderList } from '../__stubs__/works-orders-query'
import { getWorkOrders } from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrdersByIdAPI: jest.fn(() => Promise.resolve(worksOrderList)),
}))

describe('getWorkOrders', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getWorkOrders(args, mockContext)
    expect(callGetWorksOrdersByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
})
