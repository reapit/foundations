import vendorServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetVendorById,
  queryGetVendors,
  mutationUpdateVendor,
  queryGetVendorRelationships,
  queryGetVendorRelationshipById,
  mutationCreateVendorRelationship,
  mutationDeleteVendorRelationship,
} from '../resolvers'
import { updateVendorArgsStub } from '../__stubs__/update-vendor'
import { vendorStub } from '../__stubs__/vendor'
import { vendorsStub } from '../__stubs__/vendors'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getVendorById: jest.fn(() => vendorStub),
  getVendors: jest.fn(() => vendorsStub),
  createVendor: jest.fn(() => true),
  updateVendor: jest.fn(() => true),
  getVendorRelationships: jest.fn(() => []),
  getVendorRelationshipById: jest.fn(() => {}),
  createVendorRelationship: jest.fn(() => true),
  deleteVendorRelationship: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetVendorById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetVendorById(null, args, mockContext)
    expect(result).toEqual(vendorServices.getVendorById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetVendorById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetVendors', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = {
      pageSize: 1,
      pageNumber: 1,
      sortBy: 'string',
      id: ['id'],
      embed: ['embed'],
      negotiatorId: ['string'],
      officeId: ['string'],
      address: 'string',
      name: 'string',
      createdFrom: 'string',
      createdTo: 'string',
      lastCallFrom: 'string',
      lastCallTo: 'string',
      nextCallFrom: 'string',
      nextCallTo: 'string',
      metadata: ['string'],
    }
    const result = queryGetVendors(null, args, mockContext)
    expect(result).toEqual(vendorServices.getVendors(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = {
      pageSize: 1,
      pageNumber: 1,
      sortBy: 'string',
      id: ['id'],
      embed: ['embed'],
      negotiatorId: ['string'],
      officeId: ['string'],
      address: 'string',
      name: 'string',
      createdFrom: 'string',
      createdTo: 'string',
      lastCallFrom: 'string',
      lastCallTo: 'string',
      nextCallFrom: 'string',
      nextCallTo: 'string',
      metadata: ['string'],
    }
    const result = queryGetVendors(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateVendor', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateVendor(null, updateVendorArgsStub, mockContext)
    expect(result).toEqual(vendorServices.updateVendor(updateVendorArgsStub, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateVendor(null, updateVendorArgsStub, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetVendorRelationships', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id', pageSize: 5, pageNumber: 1 }
    const result = queryGetVendorRelationships(null, args, mockContext)
    expect(result).toEqual(vendorServices.getVendorRelationships(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id', pageSize: 5, pageNumber: 1 }
    const result = queryGetVendorById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetVendorRelationshipById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = queryGetVendorRelationshipById(null, args, mockContext)
    expect(result).toEqual(vendorServices.getVendorRelationshipById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = queryGetVendorRelationshipById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateVendorRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = {
      id: 'id',
      associatedId: 'associatedId',
      associatedType: 'associatedType',
      isMain: true,
    }
    const result = mutationCreateVendorRelationship(null, args, mockContext)
    expect(result).toEqual(vendorServices.createVendorRelationship(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = {
      id: 'id',
      associatedId: 'associatedId',
      associatedType: 'associatedType',
      isMain: true,
    }
    const result = mutationCreateVendorRelationship(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
describe('mutationDeleteVendorRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id', relationshipId: 'relationshipId' }

    const result = mutationDeleteVendorRelationship(null, args, mockContext)
    expect(result).toEqual(vendorServices.deleteVendorRelationship(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = mutationDeleteVendorRelationship(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
