import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetTenanciesAPI,
  callGetTenancyByIdAPI,
  callGetTenancyChecksAPI,
  callGetTenancyCheckByIdAPI,
  callGetTenancyRelationshipsAPI,
  callCreateTenancyAPI,
  callCreateTenancyCheckAPI,
  callDeleteTenancyCheckAPI,
  callUpdateTenancyCheckAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import {
  mockTenancy,
  mockTenancyCheck,
  mockTenanciesList,
  mockTenancyChecksList,
  mockTenancyRelationshipsList,
} from '../__stubs__/mock-tenancy-query'
import {
  mockCreateTenancyArgs,
  mockCreateTenancyCheckArgs,
  mockDeleteTenancyCheckArgs,
  mockUpdateTenancyCheckArgs,
} from '../__stubs__/mock-tenancy-mutation'
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

describe('callGetTenanciesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockTenanciesList })),
    })
    const args = { pageSize: 1 }
    const result = await callGetTenanciesAPI(args, mockContext)
    expect(result).toEqual(mockTenanciesList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetTenanciesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetTenancyByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockTenancy })),
    })
    const args = { id: mockTenancy.id }
    const result = await callGetTenancyByIdAPI(args, mockContext)
    expect(result).toEqual(mockTenancy)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockTenancy.id }
    const result = await callGetTenancyByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetTenancyRelationshipsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockTenancyRelationshipsList })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetTenancyRelationshipsAPI(args, mockContext)
    expect(result).toEqual(mockTenancyRelationshipsList)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetTenancyRelationshipsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetTenancyChecksAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockTenancyChecksList })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetTenancyChecksAPI(args, mockContext)
    expect(result).toEqual(mockTenancyChecksList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetTenancyChecksAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetTenancyCheckByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockTenancyCheck })),
    })
    const args = { id: mockTenancyCheck.id, checkId: 'checkId' }
    const result = await callGetTenancyCheckByIdAPI(args, mockContext)
    expect(result).toEqual(mockTenancyCheck)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockTenancyCheck.id, checkId: 'checkId' }
    const result = await callGetTenancyCheckByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateTenancyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockTenancy })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockTenancy.id)
    await callCreateTenancyAPI(mockCreateTenancyArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateTenancyAPI(mockCreateTenancyArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateTenancyCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateTenancyCheckAPI(mockCreateTenancyCheckArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateTenancyCheckAPI(mockCreateTenancyCheckArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateTenancyCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateTenancyCheckAPI(mockUpdateTenancyCheckArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateTenancyCheckAPI(mockUpdateTenancyCheckArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteTenancyCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteTenancyCheckAPI(mockDeleteTenancyCheckArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteTenancyCheckAPI(mockDeleteTenancyCheckArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
