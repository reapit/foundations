import {
  callGetCompanyByIdAPI,
  callGetCompaniesAPI,
  callCreateCompanyAPI,
  callUpdateCompanyAPI,
  callGetCompanyRolesAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateCompanyArgs } from '../__stubs__/mock-create-company'
import { mockUpdateCompanyArgs } from '../__stubs__/mock-update-company'
import { getCompanyById, getCompanies, createCompany, updateCompany, getCompanyRoles } from '../services'
import { mockCompany } from '../__stubs__/mock-company'
import { mockCompanies } from '../__stubs__/mock-companies'
import { mockCompanyRoles } from '../__stubs__/mock-company-roles'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetCompanyByIdAPI: jest.fn(() => Promise.resolve(mockCompany)),
  callGetCompaniesAPI: jest.fn(() => Promise.resolve(mockCompanies)),
  callGetCompanyRolesAPI: jest.fn(() => Promise.resolve(mockCompanyRoles)),
  callCreateCompanyAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateCompanyAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getCompanyById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getCompanyById(args, mockContext)
    expect(callGetCompanyByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockCompany)
  })
})

describe('getCompanies', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getCompanies(args, mockContext)
    expect(callGetCompaniesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockCompanies)
  })
})

describe('getCompanyRoles', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getCompanyRoles(args, mockContext)
    expect(callGetCompanyRolesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockCompanyRoles)
  })
})

describe('createCompany', () => {
  it('should return correctly', async () => {
    const result = await createCompany(mockCreateCompanyArgs, mockContext)
    expect(callCreateCompanyAPI).toHaveBeenCalledWith(mockCreateCompanyArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateCompany', () => {
  it('should return correctly', async () => {
    const result = await updateCompany(mockUpdateCompanyArgs, mockContext)
    expect(callUpdateCompanyAPI).toHaveBeenCalledWith(mockUpdateCompanyArgs, mockContext)
    expect(result).toEqual(true)
  })
})
