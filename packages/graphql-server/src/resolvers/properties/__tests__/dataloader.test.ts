import { generatePropertyBatchLoaderFn, generatePropertyLoader } from '../dataloader'
import { mockProperty } from '../__stubs__/mock-property'
import { mockProperties } from '../__stubs__/mock-properties'
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
  getPropertyById: jest.fn(() => mockProperty),
  getProperties: jest.fn(() => mockProperties),
  createProperty: jest.fn(() => true),
  updateProperty: jest.fn(() => true),
}))

describe('property-dataloader', () => {
  describe('generatePropertyBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generatePropertyBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generatePropertyBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generatePropertyLoader', () => {
    it('should return correctly', () => {
      const result = generatePropertyLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
