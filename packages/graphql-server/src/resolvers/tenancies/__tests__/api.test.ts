import { mockContext } from '../../../__stubs__/context'
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
  tenancyMock,
  tenancyCheckMock,
  tenanciesListMock,
  tenancyChecksListMock,
  tenancyRelationshipsListMock,
} from '../__stubs__/tenancy-query'
import {
  createTenancyArgsMock,
  createTenancyCheckArgsMock,
  deleteTenancyCheckArgsMock,
  updateTenancyCheckArgsMock,
} from '../__stubs__/tenancy-mutation'
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
      get: jest.fn(() => Promise.resolve({ data: tenanciesListMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetTenanciesAPI(args, mockContext)
    expect(result).toEqual(tenanciesListMock)
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
      get: jest.fn(() => Promise.resolve({ data: tenancyMock })),
    })
    const args = { id: tenancyMock.id }
    const result = await callGetTenancyByIdAPI(args, mockContext)
    expect(result).toEqual(tenancyMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: tenancyMock.id }
    const result = await callGetTenancyByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetTenancyRelationshipsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: tenancyRelationshipsListMock })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetTenancyRelationshipsAPI(args, mockContext)
    expect(result).toEqual(tenancyRelationshipsListMock)
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
      get: jest.fn(() => Promise.resolve({ data: tenancyChecksListMock })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetTenancyChecksAPI(args, mockContext)
    expect(result).toEqual(tenancyChecksListMock)
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
      get: jest.fn(() => Promise.resolve({ data: tenancyCheckMock })),
    })
    const args = { id: tenancyCheckMock.id, checkId: 'checkId' }
    const result = await callGetTenancyCheckByIdAPI(args, mockContext)
    expect(result).toEqual(tenancyCheckMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: tenancyCheckMock.id, checkId: 'checkId' }
    const result = await callGetTenancyCheckByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateTenancyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: tenancyMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(tenancyMock.id)
    await callCreateTenancyAPI(createTenancyArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateTenancyAPI(createTenancyArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateTenancyCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateTenancyCheckAPI(createTenancyCheckArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateTenancyCheckAPI(createTenancyCheckArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateTenancyCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateTenancyCheckAPI(updateTenancyCheckArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateTenancyCheckAPI(updateTenancyCheckArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteTenancyCheckAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteTenancyCheckAPI(deleteTenancyCheckArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteTenancyCheckAPI(deleteTenancyCheckArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
