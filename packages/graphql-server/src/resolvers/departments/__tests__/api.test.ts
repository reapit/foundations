import { mockDepartment } from '../__stubs__/mock-department'
import { mockDepartments } from '../__stubs__/mock-departments'
import { mockContext } from '../../../__stubs__/mock-context'
import { callGetDepartmentByIdAPI, callGetDepartmentsAPI } from '../api'

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

jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => {
    return {
      get: jest.fn().mockImplementation((values) => {
        if (values === `/departments/${mockDepartment.id}`) {
          return {
            data: mockDepartment,
          }
        }
        return {
          data: mockDepartments,
        }
      }),
    }
  }),
}))

describe('departments api', () => {
  describe('callGetDepartmentByIdAPI', () => {
    it('should run correctly', async () => {
      try {
        const mockArgs = { id: mockDepartment.id as string }
        const result = await callGetDepartmentByIdAPI(mockArgs, mockContext)
        expect(result).toEqual(mockDepartment)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })

  describe('callGetDepartmentAPI', () => {
    it('should run correctly', async () => {
      try {
        const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
        const result = await callGetDepartmentsAPI(args, mockContext)
        expect(result).toEqual(mockDepartments)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})
