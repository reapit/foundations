import { generatePropertyImageBatchLoaderFn, generatePropertyImageLoader } from '../dataloader'
import { mockPropertyImage } from '../__stubs__/mock-property-image'
import { mockPropertyImages } from '../__stubs__/mock-property-images'
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
  getPropertyImageById: jest.fn(() => mockPropertyImage),
  getPropertyImages: jest.fn(() => mockPropertyImages),
  createPropertyImage: jest.fn(() => true),
  updatePropertyImage: jest.fn(() => true),
}))

describe('propertyImage-dataloader', () => {
  describe('generatePropertyImageBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generatePropertyImageBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generatePropertyImageBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generatePropertyImageLoader', () => {
    it('should return correctly', () => {
      const result = generatePropertyImageLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
