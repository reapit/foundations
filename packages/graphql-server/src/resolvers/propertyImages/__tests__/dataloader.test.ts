import { generatePropertyImageBatchLoaderFn, generatePropertyImageLoader } from '../dataloader'
import { propertyImageMock } from '../__stubs__/propertyImage'
import { propertyImagesMock } from '../__stubs__/propertyImages'
import { mockContext } from '../../../__stubs__/context'

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
  getPropertyImageById: jest.fn(() => propertyImageMock),
  getPropertyImages: jest.fn(() => propertyImagesMock),
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
