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
import { mockContext } from '../../../__stubs__/context'
import { updateConveyancingArgsMock } from '../__stubs__/update-conveyancing'
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
import { conveyancingDetailMock } from '../__stubs__/conveyancing-detail'
import { conveyancingMock } from '../__stubs__/conveyancing'
import { conveyancingChainMock } from '../__stubs__/conveyancing-chain'
import { createDownwardLinkModelArgsMock } from '../__stubs__/create-downward-link-model'
import { createUpwardLinkModelArgsMock } from '../__stubs__/create-upward-link-model'
import { deleteDownwardLinkModelArgsMock } from '../__stubs__/delete-downward-link-model'
import { deleteUpwardLinkModelArgsMock } from '../__stubs__/delete-upward-link-model'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetConveyancingByIdAPI: jest.fn(() => Promise.resolve(conveyancingDetailMock)),
  callGetConveyancingAPI: jest.fn(() => Promise.resolve(conveyancingMock)),
  callGetConveyancingChainAPI: jest.fn(() => Promise.resolve(conveyancingChainMock)),
  callUpdateConveyancingAPI: jest.fn(() => Promise.resolve(conveyancingDetailMock)),
  callCreateDownwardLinkModelAPI: jest.fn(() => Promise.resolve(conveyancingDetailMock)),
  callCreateUpwardLinkModelAPI: jest.fn(() => Promise.resolve(conveyancingDetailMock)),
  callDeleteDownwardLinkModelAPI: jest.fn(() => Promise.resolve(conveyancingDetailMock.id)),
  callDeleteUpwardLinkModelAPI: jest.fn(() => Promise.resolve(conveyancingDetailMock.id)),
}))

describe('getConveyancingById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getConveyancingById(args, mockContext)
    expect(callGetConveyancingByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(conveyancingDetailMock)
  })
})

describe('getConveyancing', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getConveyancing(args, mockContext)
    expect(callGetConveyancingAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(conveyancingMock)
  })
})

describe('getConveyancingChain', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getConveyancingChain(args, mockContext)
    expect(callGetConveyancingChainAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(conveyancingChainMock)
  })
})

describe('updateConveyancing', () => {
  it('should return correctly', async () => {
    const result = await updateConveyancing(updateConveyancingArgsMock, mockContext)
    expect(callUpdateConveyancingAPI).toHaveBeenCalledWith(updateConveyancingArgsMock, mockContext)
    expect(result).toEqual(conveyancingDetailMock)
  })
})

describe('createDownwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await createDownwardLinkModel(createDownwardLinkModelArgsMock, mockContext)
    expect(callCreateDownwardLinkModelAPI).toHaveBeenCalledWith(createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingDetailMock)
  })
})

describe('createUpwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await createUpwardLinkModel(createUpwardLinkModelArgsMock, mockContext)
    expect(callCreateUpwardLinkModelAPI).toHaveBeenCalledWith(createUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingDetailMock)
  })
})

describe('deleteDownwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await deleteDownwardLinkModel(deleteDownwardLinkModelArgsMock, mockContext)
    expect(callDeleteDownwardLinkModelAPI).toHaveBeenCalledWith(deleteDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingDetailMock.id)
  })
})

describe('deleteUpwardLinkModel', () => {
  it('should return correctly', async () => {
    const result = await deleteUpwardLinkModel(deleteUpwardLinkModelArgsMock, mockContext)
    expect(callDeleteUpwardLinkModelAPI).toHaveBeenCalledWith(deleteUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingDetailMock.id)
  })
})
