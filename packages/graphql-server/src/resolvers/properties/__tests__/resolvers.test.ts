import propertyServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetPropertyById, queryGetProperties, mutationCreateProperty, mutationUpdateProperty } from '../resolvers'
import { createPropertyArgsMock } from '../__mocks__/create-property'
import { updatePropertyArgsMock } from '../__mocks__/update-property'
import { propertyMock } from '../__mocks__/property'
import { propertiesMock } from '../__mocks__/properties'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getPropertyById: jest.fn(() => propertyMock),
  getProperties: jest.fn(() => propertiesMock),
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
    const result = mutationCreateProperty(null, createPropertyArgsMock, mockContext)
    expect(result).toEqual(propertyServices.createProperty(createPropertyArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateProperty(null, createPropertyArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateProperty', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateProperty(null, updatePropertyArgsMock, mockContext)
    expect(result).toEqual(propertyServices.updateProperty(updatePropertyArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateProperty(null, updatePropertyArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
