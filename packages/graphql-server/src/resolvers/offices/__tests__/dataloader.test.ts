import { generateOfficeBatchLoaderFn, generateOfficeLoader } from '../dataloader'
import { officeMock } from '../__stubs__/mock-office'
import { officesMock } from '../__stubs__/mock-offices'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
})

jest.mock('../services', () => ({
  getOfficeById: jest.fn(() => officeMock),
  getOffices: jest.fn(() => officesMock),
  createOffice: jest.fn(() => true),
  updateOffice: jest.fn(() => true),
}))
jest.mock('../../../logger')

describe('property-dataloader', () => {
  describe('generateOfficeBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generateOfficeBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generateOfficeBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generateOfficeLoader', () => {
    it('should return correctly', () => {
      const result = generateOfficeLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
