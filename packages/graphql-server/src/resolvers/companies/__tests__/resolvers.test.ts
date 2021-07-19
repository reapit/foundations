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
import { mockCreateCompanyArgs } from '../__stubs__/mock-create-company'
import { mockUpdateCompanyArgs } from '../__stubs__/mock-update-company'
import { mockCompany } from '../__stubs__/mock-company'
import { mockCompanies } from '../__stubs__/mock-companies'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCompanyRoles } from '../__stubs__/mock-company-roles'

jest.mock('../services', () => ({
  getCompanyById: jest.fn(() => mockCompany),
  getCompanies: jest.fn(() => mockCompanies),
  getCompanyRoles: jest.fn(() => mockCompanyRoles),
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
    const result = mutationCreateCompany(null, mockCreateCompanyArgs, mockContext)
    expect(result).toEqual(companyServices.createCompany(mockCreateCompanyArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateCompany(null, mockCreateCompanyArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateCompany', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateCompany(null, mockUpdateCompanyArgs, mockContext)
    expect(result).toEqual(companyServices.updateCompany(mockUpdateCompanyArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateCompany(null, mockUpdateCompanyArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
