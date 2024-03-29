import { callGetDepartmentByIdAPI, callGetDepartmentsAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { getDepartmentById, getDepartments } from '../services'
import { mockDepartment } from '../__stubs__/mock-department'
import { mockDepartments } from '../__stubs__/mock-departments'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetDepartmentByIdAPI: jest.fn(() => Promise.resolve(mockDepartment)),
  callGetDepartmentsAPI: jest.fn(() => Promise.resolve(mockDepartments)),
}))

describe('getDepartmentById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getDepartmentById(args, mockContext)
    expect(callGetDepartmentByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockDepartment)
  })
})

describe('getDepartments', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getDepartments(args, mockContext)
    expect(callGetDepartmentsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockDepartments)
  })
})
