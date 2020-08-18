import { generateDepartmentBatchLoaderFn, generateDepartmentLoader } from '../dataloader'
import { departmentMock } from '../__stubs__/department'
import { departmentsMock } from '../__stubs__/departments'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getDepartmentById: jest.fn(() => departmentMock),
  getDepartments: jest.fn(() => departmentsMock),
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
