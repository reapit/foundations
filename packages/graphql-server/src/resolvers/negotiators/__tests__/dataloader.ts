import { generateNegotiatorBatchLoaderFn, generateNegotiatorLoader } from '../dataloader'
import { negotiatorMock } from '../__stubs__/negotiator'
import { negotiatorsMock } from '../__stubs__/negotiators'
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
jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetNegotiatorByIdAPI: jest.fn(() => Promise.resolve(negotiatorMock)),
  callGetNegotiatorsAPI: jest.fn(() => Promise.resolve(negotiatorsMock)),
  callCreateNegotiatorAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateNegotiatorAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('property-dataloader', () => {
  describe('generateNegotiatorBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generateNegotiatorBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generateNegotiatorBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generateNegotiatorLoader', () => {
    it('should return correctly', () => {
      const result = generateNegotiatorLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
