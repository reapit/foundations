import { mockContext } from '../../../__stubs__/mock-context'
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
import { mockConveyancingChain } from '../__stubs__/mock-conveyancing-chain'
import { mockConveyancingDetail } from '../__stubs__/mock-conveyancing-detail'
import { mockConveyancing } from '../__stubs__/mock-conveyancing'
import { mockCreateDownwardLinkModelArgs } from '../__stubs__/mock-create-downward-link-model'
import { mockCreateUpwardLinkModelArgs } from '../__stubs__/mock-create-upward-link-model'
import { mockDeleteDownwardLinkModelArgs } from '../__stubs__/mock-delete-downward-link-model'
import { mockDeleteUpwardLinkModelArgs } from '../__stubs__/mock-delete-upward-link-model'
import { mockUpdateConveyancingArgs } from '../__stubs__/mock-update-conveyancing'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
})

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
      get: jest.fn(() => Promise.resolve({ data: mockConveyancing })),
    })
    const args = { pageSize: 1 }
    const result = await callGetConveyancingAPI(args, mockContext)
    expect(result).toEqual(mockConveyancing)
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
      get: jest.fn(() => Promise.resolve({ data: mockConveyancingDetail })),
    })
    const args = { id: mockConveyancingDetail.id }
    const result = await callGetConveyancingByIdAPI(args, mockContext)
    expect(result).toEqual(mockConveyancingDetail)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockConveyancingDetail.id }
    const result = await callGetConveyancingByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetConveyancingChainAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockConveyancingChain })),
    })
    const args = { pageSize: 1 }
    const result = await callGetConveyancingChainAPI(args, mockContext)
    expect(result).toEqual(mockConveyancingChain)
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

describe('callCreateUpwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockConveyancingDetail })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockConveyancingDetail.id)
    await callCreateUpwardLinkModelAPI(mockCreateUpwardLinkModelArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateUpwardLinkModelAPI(mockCreateUpwardLinkModelArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateDownwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockConveyancingDetail })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockConveyancingDetail.id)
    await callCreateDownwardLinkModelAPI(mockCreateDownwardLinkModelArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateDownwardLinkModelAPI(mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateDownwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockConveyancingDetail })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockConveyancingDetail.id)
    await callCreateDownwardLinkModelAPI(mockCreateDownwardLinkModelArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateDownwardLinkModelAPI(mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteUpwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteUpwardLinkModelAPI(mockDeleteUpwardLinkModelArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteUpwardLinkModelAPI(mockDeleteUpwardLinkModelArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteDownwardLinkModelAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteDownwardLinkModelAPI(mockDeleteDownwardLinkModelArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteDownwardLinkModelAPI(mockDeleteDownwardLinkModelArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateConveyancingAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateConveyancingAPI(mockUpdateConveyancingArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateConveyancingAPI(mockUpdateConveyancingArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
