import { mockContext } from '../../../__stubs__/context'
import {
  callGetVendorsAPI,
  callUpdateVendorAPI,
  callGetVendorByIdAPI,
  callGetVendorRelationshipsAPI,
  callCreateVendorRelationshipAPI,
  callDeleteVendorRelationshipAPI,
  callGetVendorRelationshipByIdAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { vendorStub } from '../__stubs__/vendor'
import { vendorsStub } from '../__stubs__/vendors'
import { updateVendorArgsStub } from '../__stubs__/update-vendor'
import { vendorRelationshipStub } from '../__stubs__/vendor-relationship'
import { vendorRelationshipsStub } from '../__stubs__/vendor-relationships'
import { createVendorRelationshipArgsStub } from '../__stubs__/create-vendor-relationships'
import { deleteVendorRelationshipsArgsStub } from '../__stubs__/delete-vendor-relationships'

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

describe('callGetVendorsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: vendorsStub })),
    })
    const args = { pageSize: 1 }
    const result = await callGetVendorsAPI(args, mockContext)
    expect(result).toEqual(vendorsStub)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetVendorsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetVendorByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: vendorStub })),
    })
    const args = { id: vendorStub.id } as any
    const result = await callGetVendorByIdAPI(args, mockContext)
    expect(result).toEqual(vendorStub)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: vendorStub.id } as any
    const result = await callGetVendorByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetVendorRelationshipByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: vendorRelationshipStub })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetVendorRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual(vendorRelationshipStub)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetVendorRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetVendorRelationshipsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: vendorRelationshipsStub })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetVendorRelationshipsAPI(args, mockContext)
    expect(result).toEqual(vendorRelationshipsStub)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetVendorRelationshipsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateVendorRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: vendorRelationshipStub })),
    })
    await callCreateVendorRelationshipAPI(createVendorRelationshipArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateVendorRelationshipAPI(createVendorRelationshipArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateVendorAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateVendorAPI(updateVendorArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateVendorAPI(updateVendorArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteVendorRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteVendorRelationshipAPI(deleteVendorRelationshipsArgsStub, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteVendorRelationshipAPI(deleteVendorRelationshipsArgsStub, mockContext)
    expect(result).toEqual('caught error')
  })
})
