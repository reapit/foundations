import * as worksOrdersServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetWorksOrder,
  queryGetWorksOrdersById,
  mutationCreateWorksOrder,
  mutationUpdateWorksOrder,
  queryGetWorksOrderItems,
} from '../resolvers'

import {
  worksOrderListStub,
  worksOrderStub,
  getWorksOrderByIdArgsStub,
  worksOrderItemListStub,
  getWorksOrderItemsArgStub,
} from '../__stubs__/works-orders-query'
import { mockContext } from '../../../__stubs__/context'
import { createWorksOrderArgsStub, updateWorkOrderArgsStub } from '../__stubs__/works-orders-mutation'

jest.mock('../services', () => ({
  getWorksOrders: jest.fn(() => worksOrderListStub),
  getWorkOrderById: jest.fn(() => worksOrderStub),
  createWorksOrder: jest.fn(() => worksOrderStub),
  updateWorksOrder: jest.fn(() => worksOrderStub),
  getWorksOrderItems: jest.fn(() => worksOrderItemListStub),
}))

jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetWorksOrderItems', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = queryGetWorksOrderItems(null, getWorksOrderItemsArgStub, mockContext)

    expect(result).toEqual(worksOrdersServices.getWorksOrderItems(getWorksOrderItemsArgStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = queryGetWorksOrderItems(null, getWorksOrderItemsArgStub, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = updateWorkOrderArgsStub
    const result = mutationUpdateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.updateWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = updateWorkOrderArgsStub
    const result = mutationUpdateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = createWorksOrderArgsStub
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.createWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = createWorksOrderArgsStub
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = createWorksOrderArgsStub
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.createWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = createWorksOrderArgsStub
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrdersById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = getWorksOrderByIdArgsStub
    const result = queryGetWorksOrdersById(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.getWorkOrderById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = getWorksOrderByIdArgsStub
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
