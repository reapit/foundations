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
  worksOrderListStub,
  worksOrderStub,
  getWorksOrderByIdArgsStub,
  worksOrderItemListStub,
  getWorksOrderItemsArgsStub,
  getWorksOrderItemByIdArgsStub,
  worksOrderItemStub,
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
  createWorksOrderArgsStub,
  updateWorkOrderArgsStub,
  createWorksOrderItemArgsStub,
  deleteWorksOrderItemArgsStub,
  updateWorksOrderItemArgsStub,
} from '../__stubs__/mock-works-orders-mutation'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrderByIdAPI: jest.fn(() => Promise.resolve(worksOrderStub)),
  callGetWorksOrdersAPI: jest.fn(() => Promise.resolve(worksOrderListStub)),
  callCreateWorksOrderdAPI: jest.fn(() => Promise.resolve(worksOrderStub)),
  callUpdateWorksOrderAPI: jest.fn(() => Promise.resolve(worksOrderStub)),
  callGetWorksOrderItemsAPI: jest.fn(() => worksOrderItemListStub),

  callGetWorksOrderItemByIdAPI: jest.fn(() => worksOrderItemStub),
  callUpdateWorksOrderItemAPI: jest.fn(() => worksOrderItemStub),
  callCreateWorksOrderItemAPI: jest.fn(() => worksOrderItemStub),
  calldeleteWorksOrderItem: jest.fn(() => true),
}))

describe('updateWorksOrderItem', () => {
  it('should return correctly', async () => {
    const result = await updateWorksOrderItem(updateWorksOrderItemArgsStub, mockContext)

    expect(callUpdateWorksOrderItemAPI).toHaveBeenCalledWith(updateWorksOrderItemArgsStub, mockContext)

    expect(result).toEqual(worksOrderItemStub)
  })
})

describe('deleteWorksOrderItem', () => {
  it('should return correctly', async () => {
    const result = await deleteWorksOrderItem(deleteWorksOrderItemArgsStub, mockContext)

    expect(calldeleteWorksOrderItem).toHaveBeenCalledWith(deleteWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual(true)
  })
})

describe('createWorksOrderItem', () => {
  it('should return correctly', async () => {
    const result = await createWorksOrderItem(createWorksOrderItemArgsStub, mockContext)

    expect(callCreateWorksOrderItemAPI).toHaveBeenCalledWith(createWorksOrderItemArgsStub, mockContext)
    expect(result).toEqual(worksOrderItemStub)
  })
})

describe('getWorksOrderItemById', () => {
  it('should return correctly', async () => {
    const result = await getWorksOrderItemById(getWorksOrderItemByIdArgsStub, mockContext)

    expect(callGetWorksOrderItemByIdAPI).toHaveBeenCalledWith(getWorksOrderItemByIdArgsStub, mockContext)
    expect(result).toEqual(worksOrderItemStub)
  })
})

describe('getWorksOrderItems', () => {
  it('should return correctly', async () => {
    const args = getWorksOrderItemsArgsStub
    const result = await getWorksOrderItems(args, mockContext)

    expect(callGetWorksOrderItemsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderItemListStub)
  })
})

describe('updateWorksOrder', () => {
  it('should return correctly', async () => {
    const args = updateWorkOrderArgsStub
    const result = await updateWorksOrder(args, mockContext)
    expect(callUpdateWorksOrderAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderStub)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = createWorksOrderArgsStub
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderStub)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = createWorksOrderArgsStub
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderStub)
  })
})

describe('getWorksOrders', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getWorksOrders(args, mockContext)
    expect(callGetWorksOrdersAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderListStub)
  })
})

describe('getWorkOrderById', () => {
  it('should return correctly', async () => {
    const args = getWorksOrderByIdArgsStub
    const result = await getWorkOrderById(args, mockContext)
    expect(callGetWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderStub)
  })
})
