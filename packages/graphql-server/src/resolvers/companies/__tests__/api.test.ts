import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetCompaniesAPI,
  callCreateCompanyAPI,
  callUpdateCompanyAPI,
  callGetCompanyByIdAPI,
  callGetCompanyRolesAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockCompany } from '../__stubs__/mock-company'
import { mockCompanies } from '../__stubs__/mock-companies'
import { mockCompanyRoles } from '../__stubs__/mock-company-roles'
import { mockCreateCompanyArgs } from '../__stubs__/mock-create-company'
import { mockUpdateCompanyArgs } from '../__stubs__/mock-update-company'
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

describe('callGetCompaniesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockCompanies })),
    })
    const args = { pageSize: 1 }
    const result = await callGetCompaniesAPI(args, mockContext)
    expect(result).toEqual(mockCompanies)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetCompaniesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetCompanyByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockCompany })),
    })
    const args = { id: mockCompany.id }
    const result = await callGetCompanyByIdAPI(args, mockContext)
    expect(result).toEqual(mockCompany)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockCompany.id }
    const result = await callGetCompanyByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetCompanyRolesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockCompanyRoles })),
    })
    const args = { pageSize: 1, id: ['id'] }
    const result = await callGetCompanyRolesAPI(args, mockContext)
    expect(result).toEqual(mockCompanyRoles)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1, id: ['id'] }
    const result = await callGetCompanyRolesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateCompanyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateCompanyAPI(mockCreateCompanyArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateCompanyAPI(mockCreateCompanyArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateCompanyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateCompanyAPI(mockUpdateCompanyArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateCompanyAPI(mockUpdateCompanyArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
