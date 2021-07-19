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
import { mockCreatePropertyImageArgs } from '../__stubs__/mock-create-property-image'
import { mockUpdatePropertyImageArgs } from '../__stubs__/mock-update-property-image'
import { mockPropertyImage } from '../__stubs__/mock-property-image'
import { mockPropertyImages } from '../__stubs__/mock-property-images'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockDeletePropertyImageArgs } from '../__stubs__/mock-delete-property-image'

jest.mock('../services', () => ({
  getPropertyImageById: jest.fn(() => mockPropertyImage),
  getPropertyImages: jest.fn(() => mockPropertyImages),
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
    const result = mutationCreatePropertyImage(null, mockCreatePropertyImageArgs, mockContext)
    expect(result).toEqual(propertyImageServices.createPropertyImage(mockCreatePropertyImageArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreatePropertyImage(null, mockCreatePropertyImageArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdatePropertyImage', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdatePropertyImage(null, mockUpdatePropertyImageArgs, mockContext)
    expect(result).toEqual(propertyImageServices.updatePropertyImage(mockUpdatePropertyImageArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdatePropertyImage(null, mockUpdatePropertyImageArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeletePropertyImage', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeletePropertyImage(null, mockDeletePropertyImageArgs, mockContext)
    expect(result).toEqual(propertyImageServices.deletePropertyImage(mockDeletePropertyImageArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeletePropertyImage(null, mockDeletePropertyImageArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
