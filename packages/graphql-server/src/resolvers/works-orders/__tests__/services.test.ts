import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderAPI,
  callUpdateWorksOrderAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/context'
import { worksOrderList, worksOrder, getWorksOrderByIdArgs } from '../__stubs__/works-orders-query'
import { getWorksOrders, getWorkOrderById, createWorksOrder, updateWorksOrder } from '../services'
import { createWorksOrderArgsStub, updateWorkOrderArgsStub } from '../__stubs__/works-orders-mutation'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetWorksOrderByIdAPI: jest.fn(() => Promise.resolve(worksOrder)),
  callGetWorksOrdersAPI: jest.fn(() => Promise.resolve(worksOrderList)),
  callCreateWorksOrderAPI: jest.fn(() => Promise.resolve(worksOrder)),
  callUpdateWorksOrderAPI: jest.fn(() => Promise.resolve(worksOrder)),
}))

describe('updateWorksOrder', () => {
  it('should return correctly', async () => {
    const args = updateWorkOrderArgsStub
    const result = await updateWorksOrder(args, mockContext)
    expect(callUpdateWorksOrderAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrder)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = createWorksOrderArgsStub
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrder)
  })
})

describe('createWorksOrder', () => {
  it('should return correctly', async () => {
    const args = createWorksOrderArgsStub
    const result = await createWorksOrder(args, mockContext)
    expect(callCreateWorksOrderAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrder)
  })
})

describe('getWorksOrders', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getWorksOrders(args, mockContext)
    expect(callGetWorksOrdersAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrderList)
  })
})

describe('getWorkOrderById', () => {
  it('should return correctly', async () => {
    const args = getWorksOrderByIdArgs
    const result = await getWorkOrderById(args, mockContext)
    expect(callGetWorksOrderByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(worksOrder)
  })
})
