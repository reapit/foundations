import propertyImageServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetPropertyImageById,
  queryGetPropertyImages,
  mutationCreatePropertyImage,
  mutationUpdatePropertyImage,
  mutationDeletePropertyImage,
} from '../resolvers'
import { createPropertyImageArgsMock } from '../__stubs__/create-property-image'
import { updatePropertyImageArgsMock } from '../__stubs__/update-property-image'
import { propertyImageMock } from '../__stubs__/propertyImage'
import { propertyImagesMock } from '../__stubs__/propertyImages'
import { mockContext } from '../../../__stubs__/context'
import { deletePropertyImageArgsMock } from '../__stubs__/delete-property-image'

jest.mock('../services', () => ({
  getPropertyImageById: jest.fn(() => propertyImageMock),
  getPropertyImages: jest.fn(() => propertyImagesMock),
  createPropertyImage: jest.fn(() => true),
  updatePropertyImage: jest.fn(() => true),
  deletePropertyImage: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetPropertyImageById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetPropertyImageById(null, args, mockContext)
    expect(result).toEqual(propertyImageServices.getPropertyImageById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetPropertyImageById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetPropertyImages', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetPropertyImages(null, args, mockContext)
    expect(result).toEqual(propertyImageServices.getPropertyImages(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetPropertyImages(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreatePropertyImage', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreatePropertyImage(null, createPropertyImageArgsMock, mockContext)
    expect(result).toEqual(propertyImageServices.createPropertyImage(createPropertyImageArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreatePropertyImage(null, createPropertyImageArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdatePropertyImage', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdatePropertyImage(null, updatePropertyImageArgsMock, mockContext)
    expect(result).toEqual(propertyImageServices.updatePropertyImage(updatePropertyImageArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdatePropertyImage(null, updatePropertyImageArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeletePropertyImage', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeletePropertyImage(null, deletePropertyImageArgsMock, mockContext)
    expect(result).toEqual(propertyImageServices.deletePropertyImage(deletePropertyImageArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeletePropertyImage(null, deletePropertyImageArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
