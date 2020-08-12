import companyServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetCompanyById,
  queryGetCompanies,
  mutationCreateCompany,
  mutationUpdateCompany,
  queryGetCompanyRoles,
} from '../resolvers'
import { createCompanyArgsMock } from '../__mocks__/create-company'
import { updateCompanyArgsMock } from '../__mocks__/update-company'
import { companyMock } from '../__mocks__/company'
import { companiesMock } from '../__mocks__/companies'
import { mockContext } from '../../../__mocks__/context'
import { companyRolesMock } from '../__mocks__/company-roles'

jest.mock('../services', () => ({
  getCompanyById: jest.fn(() => companyMock),
  getCompanies: jest.fn(() => companiesMock),
  getCompanyRoles: jest.fn(() => companyRolesMock),
  createCompany: jest.fn(() => true),
  updateCompany: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetCompanyById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetCompanyById(null, args, mockContext)
    expect(result).toEqual(companyServices.getCompanyById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetCompanyById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetCompanies', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetCompanies(null, args, mockContext)
    expect(result).toEqual(companyServices.getCompanies(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetCompanies(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetCompanyRoles', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetCompanyRoles(null, args, mockContext)
    expect(result).toEqual(companyServices.getCompanyRoles(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetCompanyRoles(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateCompany', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateCompany(null, createCompanyArgsMock, mockContext)
    expect(result).toEqual(companyServices.createCompany(createCompanyArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateCompany(null, createCompanyArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateCompany', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateCompany(null, updateCompanyArgsMock, mockContext)
    expect(result).toEqual(companyServices.updateCompany(updateCompanyArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateCompany(null, updateCompanyArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
