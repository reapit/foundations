import officeServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetOfficeById, queryGetOffices, mutationCreateOffice, mutationUpdateOffice } from '../resolvers'
import { createOfficeArgsMock } from '../__stubs__/mock-create-office'
import { updateOfficeArgsMock } from '../__stubs__/mock-update-office'
import { officeMock } from '../__stubs__/mock-office'
import { officesMock } from '../__stubs__/mock-offices'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getOfficeById: jest.fn(() => officeMock),
  getOffices: jest.fn(() => officesMock),
  createOffice: jest.fn(() => true),
  updateOffice: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetOfficeById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetOfficeById(null, args, mockContext)
    expect(result).toEqual(officeServices.getOfficeById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetOfficeById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetOffices', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetOffices(null, args, mockContext)
    expect(result).toEqual(officeServices.getOffices(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetOffices(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateOffice', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateOffice(null, createOfficeArgsMock, mockContext)
    expect(result).toEqual(officeServices.createOffice(createOfficeArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateOffice(null, createOfficeArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateOffice', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateOffice(null, updateOfficeArgsMock, mockContext)
    expect(result).toEqual(officeServices.updateOffice(updateOfficeArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateOffice(null, updateOfficeArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
