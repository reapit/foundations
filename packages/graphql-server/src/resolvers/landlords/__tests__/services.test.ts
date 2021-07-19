import {
  callGetLandlordsAPI,
  callCreateLandlordAPI,
  callUpdateLandlordAPI,
  callGetLandlordByIdAPI,
  callGetLandlordRelationshipsAPI,
  callCreateLandlordRelationshipAPI,
  callDeleteLandlordRelationshipAPI,
  callGetLandlordRelationshipByIdAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import {
  mockLandlord,
  mockLandlordsList,
  mockLandlordRelationship,
  mockLandlordRelationshipsList,
} from '../__stubs__/mock-landlord-query'
import {
  mockCreateLandlordArgs,
  mockDeleteLandlordRelationshipArgs,
  mockUpdateLandlordArgs,
  mockCreateLandlordRelationshipArgs,
} from '../__stubs__/mock-landlord-mutation'
import {
  getLandlords,
  getLandlordById,
  getLandlordRelationships,
  getLandlordRelationshipById,
  createLandlord,
  createLandlordRelationship,
  updateLandlord,
  deleteLandlordRelationship,
} from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetLandlordsAPI: jest.fn(() => Promise.resolve(mockLandlordsList)),
  callCreateLandlordAPI: jest.fn(() => Promise.resolve(mockLandlord)),
  callUpdateLandlordAPI: jest.fn(() => Promise.resolve(mockLandlord)),
  callGetLandlordByIdAPI: jest.fn(() => Promise.resolve(mockLandlord)),
  callGetLandlordRelationshipsAPI: jest.fn(() => Promise.resolve(mockLandlordRelationshipsList)),
  callCreateLandlordRelationshipAPI: jest.fn(() => Promise.resolve(mockLandlordRelationship)),
  callDeleteLandlordRelationshipAPI: jest.fn(() => Promise.resolve(mockLandlordRelationship.id)),
  callGetLandlordRelationshipByIdAPI: jest.fn(() => Promise.resolve(mockLandlordRelationship)),
}))

describe('getLandlords', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getLandlords(args, mockContext)
    expect(callGetLandlordsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockLandlordsList)
  })
})

describe('getLandlordById', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getLandlordById(args, mockContext)
    expect(callGetLandlordByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockLandlord)
  })
})

describe('getLandlordRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getLandlordRelationships(args, mockContext)
    expect(callGetLandlordRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockLandlordRelationshipsList)
  })
})

describe('getLandlordRelationshipById', () => {
  it('should return correctly', async () => {
    const args = {
      id: 'MKT200035',
      relationshipId: 'MKT20000067',
    }
    const result = await getLandlordRelationshipById(args, mockContext)
    expect(callGetLandlordRelationshipByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockLandlordRelationship)
  })
})

describe('createLandlord', () => {
  it('should return correctly', async () => {
    const result = await createLandlord(mockCreateLandlordArgs, mockContext)
    expect(callCreateLandlordAPI).toHaveBeenCalledWith(mockCreateLandlordArgs, mockContext)
    expect(result).toEqual(mockLandlord)
  })
})

describe('createLandlordRelationship', () => {
  it('should return correctly', async () => {
    const result = await createLandlordRelationship(mockCreateLandlordRelationshipArgs, mockContext)
    expect(callCreateLandlordRelationshipAPI).toHaveBeenCalledWith(mockCreateLandlordRelationshipArgs, mockContext)
    expect(result).toEqual(mockLandlordRelationship)
  })
})

describe('deleteLandlordRelationship', () => {
  it('should return correctly', async () => {
    const result = await deleteLandlordRelationship(mockDeleteLandlordRelationshipArgs, mockContext)
    expect(callDeleteLandlordRelationshipAPI).toHaveBeenCalledWith(mockDeleteLandlordRelationshipArgs, mockContext)
    expect(result).toEqual(mockLandlordRelationship.id)
  })
})

describe('updateLandlord', () => {
  it('should return correctly', async () => {
    const result = await updateLandlord(mockUpdateLandlordArgs, mockContext)
    expect(callUpdateLandlordAPI).toHaveBeenCalledWith(mockUpdateLandlordArgs, mockContext)
    expect(result).toEqual(mockLandlord)
  })
})
