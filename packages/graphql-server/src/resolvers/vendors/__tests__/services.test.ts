import {
  callGetVendorByIdAPI,
  callGetVendorsAPI,
  callUpdateVendorAPI,
  callGetVendorRelationshipsAPI,
  callGetVendorRelationshipByIdAPI,
  callCreateVendorRelationshipAPI,
  callDeleteVendorRelationshipAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockUpdateVendorArgs } from '../__stubs__/mock-update-vendor'
import {
  getVendorById,
  getVendors,
  updateVendor,
  getVendorRelationships,
  getVendorRelationshipById,
  createVendorRelationship,
  deleteVendorRelationship,
} from '../services'
import { mockVendor } from '../__stubs__/mock-vendor'
import { mockVendors } from '../__stubs__/mock-vendors'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetVendorByIdAPI: jest.fn(() => Promise.resolve(mockVendor)),
  callGetVendorsAPI: jest.fn(() => Promise.resolve(mockVendors)),
  callUpdateVendorAPI: jest.fn(() => Promise.resolve(true)),
  callGetVendorRelationshipsAPI: jest.fn(() => Promise.resolve([])),
  callGetVendorRelationshipByIdAPI: jest.fn(() => Promise.resolve({})),
  callCreateVendorRelationshipAPI: jest.fn(() => Promise.resolve(true)),
  callDeleteVendorRelationshipAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getVendorById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getVendorById(args, mockContext)
    expect(callGetVendorByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockVendor)
  })
})

describe('getVendors', () => {
  it('should return correctly', async () => {
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
    const result = await getVendors(args, mockContext)
    expect(callGetVendorsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockVendors)
  })
})

describe('updateVendor', () => {
  it('should return correctly', async () => {
    const result = await updateVendor(mockUpdateVendorArgs, mockContext)
    expect(callUpdateVendorAPI).toHaveBeenCalledWith(mockUpdateVendorArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('getVendorRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: 'id', pageSize: 5, pageNumber: 1 }
    const result = await getVendorRelationships(args, mockContext)
    expect(callGetVendorRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual([])
  })
})

describe('getVendorRelationshipById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await getVendorRelationshipById(args, mockContext)
    expect(callGetVendorRelationshipByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual({})
  })
})

describe('getVendorRelationshipById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await getVendorRelationshipById(args, mockContext)
    expect(callGetVendorRelationshipByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual({})
  })
})

describe('createVendorRelationship', () => {
  it('should return correctly', async () => {
    const args = {
      id: 'id',
      associatedId: 'associatedId',
      associatedType: 'associatedType',
      isMain: true,
    }
    const result = await createVendorRelationship(args, mockContext)
    expect(callCreateVendorRelationshipAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(true)
  })
})

describe('deleteVendorRelationship', () => {
  it('should return correctly', async () => {
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await deleteVendorRelationship(args, mockContext)
    expect(callDeleteVendorRelationshipAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(true)
  })
})
