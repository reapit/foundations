import { mockContext } from '../../../__stubs__/context'
import {
  callGetCompaniesAPI,
  callCreateCompanyAPI,
  callUpdateCompanyAPI,
  callGetCompanyByIdAPI,
  callGetCompanyRolesAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { companyMock } from '../__stubs__/company'
import { companiesMock } from '../__stubs__/companies'
import { companyRolesMock } from '../__stubs__/company-roles'
import { createCompanyArgsMock } from '../__stubs__/create-company'
import { updateCompanyArgsMock } from '../__stubs__/update-company'
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
      get: jest.fn(() => Promise.resolve({ data: companiesMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetCompaniesAPI(args, mockContext)
    expect(result).toEqual(companiesMock)
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
      get: jest.fn(() => Promise.resolve({ data: companyMock })),
    })
    const args = { id: companyMock.id }
    const result = await callGetCompanyByIdAPI(args, mockContext)
    expect(result).toEqual(companyMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: companyMock.id }
    const result = await callGetCompanyByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetCompanyRolesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: companyRolesMock })),
    })
    const args = { pageSize: 1, id: ['id'] }
    const result = await callGetCompanyRolesAPI(args, mockContext)
    expect(result).toEqual(companyRolesMock)
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
    await callCreateCompanyAPI(createCompanyArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateCompanyAPI(createCompanyArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateCompanyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateCompanyAPI(updateCompanyArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateCompanyAPI(updateCompanyArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
