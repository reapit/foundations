import {
  callGetCompanyByIdAPI,
  callGetCompaniesAPI,
  callCreateCompanyAPI,
  callUpdateCompanyAPI,
  callGetCompanyRolesAPI,
} from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createCompanyArgsMock } from '../__mocks__/create-company'
import { updateCompanyArgsMock } from '../__mocks__/update-company'
import { getCompanyById, getCompanies, createCompany, updateCompany, getCompanyRoles } from '../services'
import { companyMock } from '../__mocks__/company'
import { companiesMock } from '../__mocks__/companies'
import { companyRolesMock } from '../__mocks__/company-roles'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetCompanyByIdAPI: jest.fn(() => Promise.resolve(companyMock)),
  callGetCompaniesAPI: jest.fn(() => Promise.resolve(companiesMock)),
  callGetCompanyRolesAPI: jest.fn(() => Promise.resolve(companyRolesMock)),
  callCreateCompanyAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateCompanyAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getCompanyById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getCompanyById(args, mockContext)
    expect(callGetCompanyByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(companyMock)
  })
})

describe('getCompanies', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getCompanies(args, mockContext)
    expect(callGetCompaniesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(companiesMock)
  })
})

describe('getCompanyRoles', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getCompanyRoles(args, mockContext)
    expect(callGetCompanyRolesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(companyRolesMock)
  })
})

describe('createCompany', () => {
  it('should return correctly', async () => {
    const result = await createCompany(createCompanyArgsMock, mockContext)
    expect(callCreateCompanyAPI).toHaveBeenCalledWith(createCompanyArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateCompany', () => {
  it('should return correctly', async () => {
    const result = await updateCompany(updateCompanyArgsMock, mockContext)
    expect(callUpdateCompanyAPI).toHaveBeenCalledWith(updateCompanyArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
