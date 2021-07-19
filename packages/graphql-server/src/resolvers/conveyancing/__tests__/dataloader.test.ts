import { generateConveyancingBatchLoaderFn, generateConveyancingLoader } from '../dataloader'
import { mockConveyancingDetail } from '../__stubs__/mock-conveyancing-detail'
import { mockConveyancing } from '../__stubs__/mock-conveyancing'
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
  getConveyancingById: jest.fn(() => mockConveyancingDetail),
  getConveyancing: jest.fn(() => mockConveyancing),
}))

describe('conveyancing-dataloader', () => {
  describe('generateConveyancingBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generateConveyancingBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generateConveyancingBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generateConveyancingLoader', () => {
    it('should return correctly', () => {
      const result = generateConveyancingLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
