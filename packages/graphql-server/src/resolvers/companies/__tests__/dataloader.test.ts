import { generateCompanyBatchLoaderFn, generateCompanyLoader } from '../dataloader'
import { companyMock } from '../__stubs__/mock-company'
import { companiesMock } from '../__stubs__/mock-companies'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getCompanyById: jest.fn(() => companyMock),
  getcompanies: jest.fn(() => companiesMock),
  createCompany: jest.fn(() => true),
  updateCompany: jest.fn(() => true),
}))

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
})

describe('company-dataloader', () => {
  describe('generateCompanyBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generateCompanyBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generateCompanyBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generateCompanyLoader', () => {
    it('should return correctly', () => {
      const result = generateCompanyLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
