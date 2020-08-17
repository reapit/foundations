import * as worksOrdersServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetWorksOrder, queryGetWorksOrdersById, mutationCreateWorksOrder } from '../resolvers'

import { worksOrderList, worksOrder, getWorksOrderByIdArgs } from '../__stubs__/works-orders-query'
import { mockContext } from '../../../__stubs__/context'
import { createWorksOrderArgs } from '../__stubs__/works-orders-mutation'

jest.mock('../services', () => ({
  getWorksOrders: jest.fn(() => worksOrderList),
  getWorkOrderById: jest.fn(() => worksOrder),
  createWorksOrder: jest.fn(() => worksOrder),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('mutationCreateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = createWorksOrderArgs
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.createWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = createWorksOrderArgs
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrdersById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = getWorksOrderByIdArgs
    const result = queryGetWorksOrdersById(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.getWorkOrderById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = getWorksOrderByIdArgs
    const result = queryGetWorksOrdersById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { pageSize: 1 }
    const result = queryGetWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.getWorksOrders(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { pageSize: 1 }
    const result = queryGetWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
