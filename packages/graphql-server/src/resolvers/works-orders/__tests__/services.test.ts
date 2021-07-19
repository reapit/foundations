import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
  callGetWorksOrderItemByIdAPI,
  callCreateWorksOrderItemAPI,
  calldeleteWorksOrderItem,
  callUpdateWorksOrderItemAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import {
  mockWorksOrderList,
  mockWorksOrder,
  mockGetWorksOrderByIdArgs,
  mockWorksOrderItemList,
  mockGetWorksOrderItemsArgs,
  mockGetWorksOrderItemByIdArgs,
  mockWorksOrderItem,
} from '../__stubs__/mock-works-orders-query'
import {
  getWorksOrders,
  getWorkOrderById,
  createWorksOrder,
  updateWorksOrder,
  getWorksOrderItems,
  getWorksOrderItemById,
  createWorksOrderItem,
  deleteWorksOrderItem,
  updateWorksOrderItem,
} from '../services'
import {
  mockCreateWorksOrderArgs,
  mockUpdateWorkOrderArgs,
  mockCreateWorksOrderItemArgs,
  mockDeleteWorksOrderItemArgs,
  mockUpdateWorksOrderItemArgs,
} from '../__stubs__/mock-works-orders-mutation'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrderByIdAPI: jest.fn(() => Promise.resolve(mockWorksOrder)),
  callGetWorksOrdersAPI: jest.fn(() => Promise.resolve(mockWorksOrderList)),
  callCreateWorksOrderdAPI: jest.fn(() => Promise.resolve(mockWorksOrder)),
  callUpdateWorksOrderAPI: jest.fn(() => Promise.resolve(mockWorksOrder)),
  callGetWorksOrderItemsAPI: jest.fn(() => mockWorksOrderItemList),

  callGetWorksOrderItemByIdAPI: jest.fn(() => mockWorksOrderItem),
  callUpdateWorksOrderItemAPI: jest.fn(() => mockWorksOrderItem),
  callCreateWorksOrderItemAPI: jest.fn(() => mockWorksOrderItem),
  calldeleteWorksOrderItem: jest.fn(() => true),
}))

describe('updateWorksOrderItem', () => {
  it('should return correctly', async () => {
    const result = await updateWorksOrderItem(mockUpdateWorksOrderItemArgs, mockContext)

    expect(callUpdateWorksOrderItemAPI).toHaveBeenCalledWith(mockUpdateWorksOrderItemArgs, mockContext)

    expect(result).toEqual(mockWorksOrderItem)
  })
})

describe('deleteWorksOrderItem', () => {
  it('should return correctly', async () => {
    const result = await deleteWorksOrderItem(mockDeleteWorksOrderItemArgs, mockContext)

    expect(calldeleteWorksOrderItem).toHaveBeenCalledWith(mockDeleteWorksOrderItemArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('createWorksOrderItem', () => {
  it('should return correctly', async () => {
    const result = await createWorksOrderItem(mockCreateWorksOrderItemArgs, mockContext)

    expect(callCreateWorksOrderItemAPI).toHaveBeenCalledWith(mockCreateWorksOrderItemArgs, mockContext)
    expect(result).toEqual(mockWorksOrderItem)
  })
})

describe('getWorksOrderItemById', () => {
  it('should return correctly', async () => {
    const result = await getWorksOrderItemById(mockGetWorksOrderItemByIdArgs, mockContext)

    expect(callGetWorksOrderItemByIdAPI).toHaveBeenCalledWith(mockGetWorksOrderItemByIdArgs, mockContext)
    expect(result).toEqual(mockWorksOrderItem)
  })
})

describe('getWorksOrderItems', () => {
  it('should return correctly', async () => {
    const args = mockGetWorksOrderItemsArgs
    const result = await getWorksOrderItems(args, mockContext)

    expect(callGetWorksOrderItemsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockWorksOrderItemList)
  })
})

describe('updateWorksOrder', () => {
  it('should return correctly', async () => {
    const args = mockUpdateWorkOrderArgs
    const result = await updateWorksOrder(args, mockContext)
    expect(callUpdateWorksOrderAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockWorksOrder)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = mockCreateWorksOrderArgs
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockWorksOrder)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = mockCreateWorksOrderArgs
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockWorksOrder)
  })
})

describe('getWorksOrders', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getWorksOrders(args, mockContext)
    expect(callGetWorksOrdersAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockWorksOrderList)
  })
})

describe('getWorkOrderById', () => {
  it('should return correctly', async () => {
    const args = mockGetWorksOrderByIdArgs
    const result = await getWorkOrderById(args, mockContext)
    expect(callGetWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockWorksOrder)
  })
})
