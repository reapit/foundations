import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderByIdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
  callGetWorksOrderItemByIdAPI,
  callCreateWorksOrderItemAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/context'
import {
  worksOrderListStub,
  worksOrderStub,
  getWorksOrderByIdArgsStub,
  worksOrderItemListStub,
  getWorksOrderItemsArgsStub,
  getWorksOrderItemByIdArgsStub,
  worksOrderItemStub,
} from '../__stubs__/works-orders-query'
import {
  getWorksOrders,
  getWorkOrderById,
  createWorksOrder,
  updateWorksOrder,
  getWorksOrderItems,
  getWorksOrderItemById,
  createWorksOrderItem,
} from '../services'
import {
  createWorksOrderArgsStub,
  updateWorkOrderArgsStub,
  createWorksOrderItemArgsStub,
} from '../__stubs__/works-orders-mutation'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrderByIdAPI: jest.fn(() => Promise.resolve(worksOrderStub)),
  callGetWorksOrdersAPI: jest.fn(() => Promise.resolve(worksOrderListStub)),
  callCreateWorksOrderByIdAPI: jest.fn(() => Promise.resolve(worksOrderStub)),
  callUpdateWorksOrderAPI: jest.fn(() => Promise.resolve(worksOrderStub)),
  callGetWorksOrderItemsAPI: jest.fn(() => worksOrderItemListStub),
  /*
   * TODOME(postWorkerkerItem)
   * import api
   */

  callGetWorksOrderItemByIdAPI: jest.fn(() => worksOrderItemStub),
  callCreateWorksOrderItemAPI: jest.fn(() => worksOrderItemStub),
}))
/*
 * TODOME(postWorkerkerItem)
 * rename
 */

describe('createWorksOrderItem', () => {
  it('should return correctly', async () => {
    /*
     * TODOME(postWorkerkerItem)
     * chnge func
     */

    const result = await createWorksOrderItem(createWorksOrderItemArgsStub, mockContext)
    /*
     * TODOME(postWorkerkerItem)
     * change api, change args here
     */

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
    expect(callCreateWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderStub)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = createWorksOrderArgsStub
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
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
