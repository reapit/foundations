import propertyServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetPropertyById, queryGetProperties, mutationCreateProperty, mutationUpdateProperty } from '../resolvers'
import { mockCreatePropertyArgs } from '../__stubs__/mock-create-property'
import { mockUpdatePropertyArgs } from '../__stubs__/mock-update-property'
import { mockProperty } from '../__stubs__/mock-property'
import { mockProperties } from '../__stubs__/mock-properties'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getPropertyById: jest.fn(() => mockProperty),
  getProperties: jest.fn(() => mockProperties),
  createProperty: jest.fn(() => true),
  updateProperty: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetPropertyById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetPropertyById(null, args, mockContext)
    expect(result).toEqual(propertyServices.getPropertyById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetPropertyById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetProperties', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetProperties(null, args, mockContext)
    expect(result).toEqual(propertyServices.getProperties(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetProperties(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateProperty', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateProperty(null, mockCreatePropertyArgs, mockContext)
    expect(result).toEqual(propertyServices.createProperty(mockCreatePropertyArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateProperty(null, mockCreatePropertyArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateProperty', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateProperty(null, mockUpdatePropertyArgs, mockContext)
    expect(result).toEqual(propertyServices.updateProperty(mockUpdatePropertyArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateProperty(null, mockUpdatePropertyArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
