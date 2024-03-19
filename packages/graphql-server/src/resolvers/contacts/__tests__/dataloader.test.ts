import { generateContactLoader, generateContactBatchLoaderFn } from '../dataloader'
import { mockContacts } from '../__stubs__/mock-contacts'
import { mockContext } from '../../../__stubs__/mock-context'
jest.mock('../../../logger')
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
  getContacts: jest.fn(() => Promise.resolve(mockContacts)),
}))

describe('contacts-dataloader', () => {
  describe('generateContactBatchLoaderFn', () => {
    it('should run correctly', async () => {
      const fn = generateContactBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = await fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', async () => {
      const fn = generateContactBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = await fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generateContactLoader', () => {
    it('should return correctly', () => {
      const result = generateContactLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
