import {
  callGetConveyancingByIdAPI,
  callGetConveyancingAPI,
  callUpdateConveyancingAPI,
  callGetConveyancingChainAPI,
  callCreateDownwardLinkModelAPI,
  callCreateUpwardLinkModelAPI,
  callDeleteDownwardLinkModelAPI,
  callDeleteUpwardLinkModelAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockUpdateConveyancingArgs } from '../__stubs__/mock-update-conveyancing'
import {
  getConveyancingById,
  getConveyancing,
  updateConveyancing,
  getConveyancingChain,
  createDownwardLinkModel,
  createUpwardLinkModel,
  deleteDownwardLinkModel,
  deleteUpwardLinkModel,
} from '../services'
import { mockConveyancingDetail } from '../__stubs__/mock-conveyancing-detail'
import { mockConveyancing } from '../__stubs__/mock-conveyancing'
import { mockConveyancingChain } from '../__stubs__/mock-conveyancing-chain'
import { mockCreateDownwardLinkModelArgs } from '../__stubs__/mock-create-downward-link-model'
import { mockCreateUpwardLinkModelArgs } from '../__stubs__/mock-create-upward-link-model'
import { mockDeleteDownwardLinkModelArgs } from '../__stubs__/mock-delete-downward-link-model'
import { mockDeleteUpwardLinkModelArgs } from '../__stubs__/mock-delete-upward-link-model'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetConveyancingByIdAPI: jest.fn(() => Promise.resolve(mockConveyancingDetail)),
  callGetConveyancingAPI: jest.fn(() => Promise.resolve(mockConveyancing)),
  callGetConveyancingChainAPI: jest.fn(() => Promise.resolve(mockConveyancingChain)),
  callUpdateConveyancingAPI: jest.fn(() => Promise.resolve(mockConveyancingDetail)),
  callCreateDownwardLinkModelAPI: jest.fn(() => Promise.resolve(mockConveyancingDetail)),
  callCreateUpwardLinkModelAPI: jest.fn(() => Promise.resolve(mockConveyancingDetail)),
  callDeleteDownwardLinkModelAPI: jest.fn(() => Promise.resolve(mockConveyancingDetail.id)),
  callDeleteUpwardLinkModelAPI: jest.fn(() => Promise.resolve(mockConveyancingDetail.id)),
}))

describe('getConveyancingById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getConveyancingById(args, mockContext)
    expect(callGetConveyancingByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockConveyancingDetail)
  })
})

describe('getConveyancing', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getConveyancing(args, mockContext)
    expect(callGetConveyancingAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockConveyancing)
  })
})

describe('getConveyancingChain', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getConveyancingChain(args, mockContext)
    expect(callGetConveyancingChainAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockConveyancingChain)
  })
})

describe('updateConveyancing', () => {
  it('should return correctly', async () => {
    const result = await updateConveyancing(mockUpdateConveyancingArgs, mockContext)
    expect(callUpdateConveyancingAPI).toHaveBeenCalledWith(mockUpdateConveyancingArgs, mockContext)
    expect(result).toEqual(mockConveyancingDetail)
  })
})

describe('createDownwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await createDownwardLinkModel(mockCreateDownwardLinkModelArgs, mockContext)
    expect(callCreateDownwardLinkModelAPI).toHaveBeenCalledWith(mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(mockConveyancingDetail)
  })
})

describe('createUpwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await createUpwardLinkModel(mockCreateUpwardLinkModelArgs, mockContext)
    expect(callCreateUpwardLinkModelAPI).toHaveBeenCalledWith(mockCreateUpwardLinkModelArgs, mockContext)
    expect(result).toEqual(mockConveyancingDetail)
  })
})

describe('deleteDownwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await deleteDownwardLinkModel(mockDeleteDownwardLinkModelArgs, mockContext)
    expect(callDeleteDownwardLinkModelAPI).toHaveBeenCalledWith(mockDeleteDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(mockConveyancingDetail.id)
  })
})

describe('deleteUpwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await deleteUpwardLinkModel(mockDeleteUpwardLinkModelArgs, mockContext)
    expect(callDeleteUpwardLinkModelAPI).toHaveBeenCalledWith(mockDeleteUpwardLinkModelArgs, mockContext)
    expect(result).toEqual(mockConveyancingDetail.id)
  })
})
