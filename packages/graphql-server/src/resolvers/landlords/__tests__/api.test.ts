import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetLandlordsAPI,
  callCreateLandlordAPI,
  callUpdateLandlordAPI,
  callGetLandlordByIdAPI,
  callGetLandlordRelationshipsAPI,
  callCreateLandlordRelationshipAPI,
  callDeleteLandlordRelationshipAPI,
  callGetLandlordRelationshipByIdAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import {
  mockLandlordsList,
  mockLandlord,
  mockLandlordRelationship,
  mockLandlordRelationshipsList,
} from '../__stubs__/mock-landlord-query'
import {
  mockCreateLandlordArgs,
  mockUpdateLandlordArgs,
  mockCreateLandlordRelationshipArgs,
  mockDeleteLandlordRelationshipArgs,
} from '../__stubs__/mock-landlord-mutation'
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

describe('callGetLandlordsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockLandlordsList })),
    })
    const args = { pageSize: 1 }
    const result = await callGetLandlordsAPI(args, mockContext)
    expect(result).toEqual(mockLandlordsList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetLandlordsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetLandlordByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockLandlord })),
    })
    const args = { id: mockLandlord.id }
    const result = await callGetLandlordByIdAPI(args, mockContext)
    expect(result).toEqual(mockLandlord)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockLandlord.id }
    const result = await callGetLandlordByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetLandlordRelationshipByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockLandlordRelationship })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetLandlordRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual(mockLandlordRelationship)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetLandlordRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetLandlordRelationshipsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockLandlordRelationshipsList })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetLandlordRelationshipsAPI(args, mockContext)
    expect(result).toEqual(mockLandlordRelationshipsList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetLandlordRelationshipsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateLandlordAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockLandlord })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockLandlord.id)
    await callCreateLandlordAPI(mockCreateLandlordArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateLandlordAPI(mockCreateLandlordArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateLandlordRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateLandlordRelationshipAPI(mockCreateLandlordRelationshipArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateLandlordRelationshipAPI(mockCreateLandlordRelationshipArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateLandlordAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateLandlordAPI(mockUpdateLandlordArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateLandlordAPI(mockUpdateLandlordArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteLandlordRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteLandlordRelationshipAPI(mockDeleteLandlordRelationshipArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteLandlordRelationshipAPI(mockDeleteLandlordRelationshipArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
