import * as worksOrdersServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetWorksOrder } from '../resolvers'

import { worksOrderList } from '../__stubs__/works-orders-query'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getWorkOrders: jest.fn(() => worksOrderList),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { pageSize: 1 }
    const result = queryGetWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.getWorkOrders(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { pageSize: 1 }
    const result = queryGetWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
