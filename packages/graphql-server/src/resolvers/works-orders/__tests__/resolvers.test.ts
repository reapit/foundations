import * as worksOrdersServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetWorksOrder,
  queryGetWorksOrdersById,
  mutationCreateWorksOrder,
  mutationUpdateWorksOrder,
  queryGetWorksOrderItems,
  queryGetWorksOrderById,
  mutationCreateWorksOrderItem,
  mutationUpdateWorksOrderItem,
  mutationdeleteWorksOrderItem,
} from '../resolvers'

import {
  mockWorksOrderList,
  mockWorksOrder,
  mockGetWorksOrderByIdArgs,
  mockWorksOrderItemList,
  mockGetWorksOrderItemsArgs,
  mockGetWorksOrderItemByIdArgs,
  mockWorksOrderItem,
} from '../__stubs__/mock-works-orders-query'
import { mockContext } from '../../../__stubs__/mock-context'
import {
  mockCreateWorksOrderArgs,
  mockUpdateWorkOrderArgs,
  mockCreateWorksOrderItemArgs,
  mockUpdateWorksOrderItemArgs,
  mockDeleteWorksOrderItemArgs,
} from '../__stubs__/mock-works-orders-mutation'

jest.mock('../services', () => ({
  getWorksOrders: jest.fn(() => mockWorksOrderList),
  getWorkOrderById: jest.fn(() => mockWorksOrder),
  createWorksOrder: jest.fn(() => mockWorksOrder),
  updateWorksOrder: jest.fn(() => mockWorksOrder),
  getWorksOrderItems: jest.fn(() => mockWorksOrderItemList),

  createWorksOrderItem: jest.fn(() => mockWorksOrderItem),
  updateWorksOrderItem: jest.fn(() => mockWorksOrderItem),
  getWorksOrderItemById: jest.fn(() => mockWorksOrderItem),
  postWorkerkerItem: jest.fn(() => mockCreateWorksOrderItemArgs),
  deleteWorksOrderItem: jest.fn(() => true),
}))

jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('mutationdeleteWorksOrderItem', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = mutationdeleteWorksOrderItem(null, mockDeleteWorksOrderItemArgs, mockContext)

    expect(result).toEqual(worksOrdersServices.deleteWorksOrderItem(mockDeleteWorksOrderItemArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = mutationdeleteWorksOrderItem(null, mockUpdateWorksOrderItemArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateWorksOrderItem', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = mutationUpdateWorksOrderItem(null, mockUpdateWorksOrderItemArgs, mockContext)

    expect(result).toEqual(worksOrdersServices.updateWorksOrderItem(mockUpdateWorksOrderItemArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = mutationUpdateWorksOrderItem(null, mockUpdateWorksOrderItemArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateWorksOrderItem', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = mutationCreateWorksOrderItem(null, mockCreateWorksOrderItemArgs, mockContext)

    expect(result).toEqual(worksOrdersServices.createWorksOrderItem(mockCreateWorksOrderItemArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = mutationCreateWorksOrderItem(null, mockCreateWorksOrderItemArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrderById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = queryGetWorksOrderById(null, mockGetWorksOrderItemByIdArgs, mockContext)

    expect(result).toEqual(worksOrdersServices.getWorksOrderItemById(mockGetWorksOrderItemByIdArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = queryGetWorksOrderById(null, mockGetWorksOrderItemByIdArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrderItems', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = queryGetWorksOrderItems(null, mockGetWorksOrderItemsArgs, mockContext)

    expect(result).toEqual(worksOrdersServices.getWorksOrderItems(mockGetWorksOrderItemsArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = queryGetWorksOrderItems(null, mockGetWorksOrderItemsArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = mockUpdateWorkOrderArgs
    const result = mutationUpdateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.updateWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = mockUpdateWorkOrderArgs
    const result = mutationUpdateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = mockCreateWorksOrderArgs
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.createWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = mockCreateWorksOrderArgs
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateWorksOrder', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = mockCreateWorksOrderArgs
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.createWorksOrder(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = mockCreateWorksOrderArgs
    const result = mutationCreateWorksOrder(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrdersById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = mockGetWorksOrderByIdArgs
    const result = queryGetWorksOrdersById(null, args, mockContext)
    expect(result).toEqual(worksOrdersServices.getWorkOrderById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = mockGetWorksOrderByIdArgs
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
