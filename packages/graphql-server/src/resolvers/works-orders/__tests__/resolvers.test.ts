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
  worksOrderListStub,
  worksOrderStub,
  getWorksOrderByIdArgsStub,
  worksOrderItemListStub,
  getWorksOrderItemsArgsStub,
  getWorksOrderItemByIdArgsStub,
  worksOrderItemStub,
} from '../__stubs__/works-orders-query'
import { mockContext } from '../../../__stubs__/context'
import {
  createWorksOrderArgsStub,
  updateWorkOrderArgsStub,
  createWorksOrderItemArgsStub,
  updateWorksOrderItemArgsStub,
  deleteWorksOrderItemArgsStub,
} from '../__stubs__/works-orders-mutation'

jest.mock('../services', () => ({
  getWorksOrders: jest.fn(() => worksOrderListStub),
  getWorkOrderById: jest.fn(() => worksOrderStub),
  createWorksOrder: jest.fn(() => worksOrderStub),
  updateWorksOrder: jest.fn(() => worksOrderStub),
  getWorksOrderItems: jest.fn(() => worksOrderItemListStub),

  createWorksOrderItem: jest.fn(() => worksOrderItemStub),
  updateWorksOrderItem: jest.fn(() => worksOrderItemStub),
  getWorksOrderItemById: jest.fn(() => worksOrderItemStub),
  postWorkerkerItem: jest.fn(() => createWorksOrderItemArgsStub),
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

    const result = mutationdeleteWorksOrderItem(null, deleteWorksOrderItemArgsStub, mockContext)

    expect(result).toEqual(worksOrdersServices.deleteWorksOrderItem(deleteWorksOrderItemArgsStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = mutationdeleteWorksOrderItem(null, updateWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateWorksOrderItem', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = mutationUpdateWorksOrderItem(null, updateWorksOrderItemArgsStub, mockContext)

    expect(result).toEqual(worksOrdersServices.updateWorksOrderItem(updateWorksOrderItemArgsStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = mutationUpdateWorksOrderItem(null, updateWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateWorksOrderItem', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = mutationCreateWorksOrderItem(null, createWorksOrderItemArgsStub, mockContext)

    expect(result).toEqual(worksOrdersServices.createWorksOrderItem(createWorksOrderItemArgsStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = mutationCreateWorksOrderItem(null, createWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrderById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = queryGetWorksOrderById(null, getWorksOrderItemByIdArgsStub, mockContext)

    expect(result).toEqual(worksOrdersServices.getWorksOrderItemById(getWorksOrderItemByIdArgsStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = queryGetWorksOrderById(null, getWorksOrderItemByIdArgsStub, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetWorksOrderItems', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)

    const result = queryGetWorksOrderItems(null, getWorksOrderItemsArgsStub, mockContext)

    expect(result).toEqual(worksOrdersServices.getWorksOrderItems(getWorksOrderItemsArgsStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)

    const result = queryGetWorksOrderItems(null, getWorksOrderItemsArgsStub, mockContext)
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
