import { departmentMock } from '../__stubs__/department'
import { departmentsMock } from '../__stubs__/departments'
import { mockContext } from '../../../__stubs__/context'
import { callGetDepartmentByIdAPI, callGetDepartmentsAPI } from '../api'
import { URLS } from '../../../constants/api'

jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => {
    return {
      get: jest.fn().mockImplementation(values => {
        if (values === `${URLS.departments}/${departmentMock.id}`) {
          return {
            data: departmentMock,
          }
        }
        return {
          data: departmentsMock,
        }
      }),
    }
  }),
}))

describe('departments api', () => {
  describe('callGetDepartmentByIdAPI', () => {
    it('should run correctly', async () => {
      try {
        const mockArgs = { id: departmentMock.id }
        const result = await callGetDepartmentByIdAPI(mockArgs, mockContext)
        expect(result).toEqual(departmentMock)
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
        expect(result).toEqual(departmentsMock)
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})
