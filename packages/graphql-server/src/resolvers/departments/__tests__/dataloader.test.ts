import { generateDepartmentBatchLoaderFn, generateDepartmentLoader } from '../dataloader'
import { mockDepartment } from '../__stubs__/mock-department'
import { mockDepartments } from '../__stubs__/mock-departments'
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
  getDepartmentById: jest.fn(() => mockDepartment),
  getDepartments: jest.fn(() => mockDepartments),
}))

describe('department-dataloader', () => {
  describe('generateDepartmentBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generateDepartmentBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generateDepartmentBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generateDepartmentLoader', () => {
    it('should return correctly', () => {
      const result = generateDepartmentLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
