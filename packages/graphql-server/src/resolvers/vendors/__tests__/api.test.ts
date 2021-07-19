import { mockContext } from '../../../__stubs__/mock-context'
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
import { mockVendor } from '../__stubs__/mock-vendor'
import { mockVendors } from '../__stubs__/mock-vendors'
import { mockUpdateVendorArgs } from '../__stubs__/mock-update-vendor'
import { mockVendorRelationship } from '../__stubs__/mock-vendor-relationship'
import { mockVendorRelationships } from '../__stubs__/mock-vendor-relationships'
import { mockCreateVendorRelationshipArgs } from '../__stubs__/mock-create-vendor-relationships'
import { mockDeleteVendorRelationshipsArgs } from '../__stubs__/mock-delete-vendor-relationships'

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
      get: jest.fn(() => Promise.resolve({ data: mockVendors })),
    })
    const args = { pageSize: 1 }
    const result = await callGetVendorsAPI(args, mockContext)
    expect(result).toEqual(mockVendors)
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
      get: jest.fn(() => Promise.resolve({ data: mockVendor })),
    })
    const args = { id: mockVendor.id } as any
    const result = await callGetVendorByIdAPI(args, mockContext)
    expect(result).toEqual(mockVendor)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockVendor.id } as any
    const result = await callGetVendorByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetVendorRelationshipByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockVendorRelationship })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetVendorRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual(mockVendorRelationship)
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
      get: jest.fn(() => Promise.resolve({ data: mockVendorRelationships })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetVendorRelationshipsAPI(args, mockContext)
    expect(result).toEqual(mockVendorRelationships)
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
      get: jest.fn(() => Promise.resolve({ data: mockVendorRelationship })),
    })
    await callCreateVendorRelationshipAPI(mockCreateVendorRelationshipArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateVendorRelationshipAPI(mockCreateVendorRelationshipArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateVendorAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateVendorAPI(mockUpdateVendorArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateVendorAPI(mockUpdateVendorArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteVendorRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteVendorRelationshipAPI(mockDeleteVendorRelationshipsArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteVendorRelationshipAPI(mockDeleteVendorRelationshipsArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
