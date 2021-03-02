import { callGetDepartmentByIdAPI, callGetDepartmentsAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { getDepartmentById, getDepartments } from '../services'
import { departmentMock } from '../__stubs__/mock-department'
import { departmentsMock } from '../__stubs__/mock-departments'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetDepartmentByIdAPI: jest.fn(() => Promise.resolve(departmentMock)),
  callGetDepartmentsAPI: jest.fn(() => Promise.resolve(departmentsMock)),
}))

describe('getDepartmentById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getDepartmentById(args, mockContext)
    expect(callGetDepartmentByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(departmentMock)
  })
})

describe('getDepartments', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getDepartments(args, mockContext)
    expect(callGetDepartmentsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(departmentsMock)
  })
})
