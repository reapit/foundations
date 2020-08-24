import { mockContext } from '../../../__stubs__/context'
import {
  callGetConveyancingAPI,
  callGetConveyancingByIdAPI,
  callGetConveyancingChainAPI,
  callUpdateConveyancingAPI,
  callCreateUpwardLinkModelAPI,
  callDeleteUpwardLinkModelAPI,
  callCreateDownwardLinkModelAPI,
  callDeleteDownwardLinkModelAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { conveyancingChainMock } from '../__stubs__/conveyancing-chain'
import { conveyancingDetailMock } from '../__stubs__/conveyancing-detail'
import { conveyancingMock } from '../__stubs__/conveyancing'
import { createDownwardLinkModelArgsMock } from '../__stubs__/create-downward-link-model'
import { createUpwardLinkModelArgsMock } from '../__stubs__/create-upward-link-model'
import { deleteDownwardLinkModelArgsMock } from '../__stubs__/delete-downward-link-model'
import { deleteUpwardLinkModelArgsMock } from '../__stubs__/delete-upward-link-model'
import { updateConveyancingArgsMock } from '../__stubs__/update-conveyancing'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

jest.mock('../../../utils/get-id-from-create-headers', () => ({
  getIdFromCreateHeaders: jest.fn(),
}))

jest.mock('../../../utils/handle-error', () => ({
  handleError: jest.fn(() => Promise.resolve('caught error')),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}))

describe('callGetConveyancingAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: conveyancingMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetConveyancingAPI(args, mockContext)
    expect(result).toEqual(conveyancingMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetConveyancingAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetConveyancingByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: conveyancingDetailMock })),
    })
    const args = { id: conveyancingDetailMock.id }
    const result = await callGetConveyancingByIdAPI(args, mockContext)
    expect(result).toEqual(conveyancingDetailMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: conveyancingDetailMock.id }
    const result = await callGetConveyancingByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetConveyancingChainAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: conveyancingChainMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetConveyancingChainAPI(args, mockContext)
    expect(result).toEqual(conveyancingChainMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetConveyancingChainAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

///asdas d
describe('callCreateUpwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: conveyancingDetailMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(conveyancingDetailMock.id)
    await callCreateUpwardLinkModelAPI(createUpwardLinkModelArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateUpwardLinkModelAPI(createUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateDownwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: conveyancingDetailMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(conveyancingDetailMock.id)
    await callCreateDownwardLinkModelAPI(createDownwardLinkModelArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateDownwardLinkModelAPI(createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateDownwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: conveyancingDetailMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(conveyancingDetailMock.id)
    await callCreateDownwardLinkModelAPI(createDownwardLinkModelArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateDownwardLinkModelAPI(createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteUpwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteUpwardLinkModelAPI(deleteUpwardLinkModelArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteUpwardLinkModelAPI(deleteUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteDownwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteDownwardLinkModelAPI(deleteDownwardLinkModelArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteDownwardLinkModelAPI(deleteDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateConveyancingAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateConveyancingAPI(updateConveyancingArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateConveyancingAPI(updateConveyancingArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
