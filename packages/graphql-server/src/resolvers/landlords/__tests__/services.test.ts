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
import { mockContext } from '../../../__stubs__/context'
import {
  landlordMock,
  landlordsListMock,
  landlordRelationshipMock,
  landlordRelationshipsListMock,
} from '../__stubs__/landlord-query'
import {
  createLandlordArgsMock,
  deleteLandlordRelationshipArgsMock,
  updateLandlordArgsMock,
  createLandlordRelationshipArgsMock,
} from '../__stubs__/landlord-mutation'
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
  callGetLandlordsAPI: jest.fn(() => Promise.resolve(landlordsListMock)),
  callCreateLandlordAPI: jest.fn(() => Promise.resolve(landlordMock)),
  callUpdateLandlordAPI: jest.fn(() => Promise.resolve(landlordMock)),
  callGetLandlordByIdAPI: jest.fn(() => Promise.resolve(landlordMock)),
  callGetLandlordRelationshipsAPI: jest.fn(() => Promise.resolve(landlordRelationshipsListMock)),
  callCreateLandlordRelationshipAPI: jest.fn(() => Promise.resolve(landlordRelationshipMock)),
  callDeleteLandlordRelationshipAPI: jest.fn(() => Promise.resolve(landlordRelationshipMock.id)),
  callGetLandlordRelationshipByIdAPI: jest.fn(() => Promise.resolve(landlordRelationshipMock)),
}))

describe('getLandlords', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getLandlords(args, mockContext)
    expect(callGetLandlordsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(landlordsListMock)
  })
})

describe('getLandlordById', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getLandlordById(args, mockContext)
    expect(callGetLandlordByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(landlordMock)
  })
})

describe('getLandlordRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getLandlordRelationships(args, mockContext)
    expect(callGetLandlordRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(landlordRelationshipsListMock)
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
    expect(result).toEqual(landlordRelationshipMock)
  })
})

describe('createLandlord', () => {
  it('should return correctly', async () => {
    const result = await createLandlord(createLandlordArgsMock, mockContext)
    expect(callCreateLandlordAPI).toHaveBeenCalledWith(createLandlordArgsMock, mockContext)
    expect(result).toEqual(landlordMock)
  })
})

describe('createLandlordRelationship', () => {
  it('should return correctly', async () => {
    const result = await createLandlordRelationship(createLandlordRelationshipArgsMock, mockContext)
    expect(callCreateLandlordRelationshipAPI).toHaveBeenCalledWith(createLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual(landlordRelationshipMock)
  })
})

describe('deleteLandlordRelationship', () => {
  it('should return correctly', async () => {
    const result = await deleteLandlordRelationship(deleteLandlordRelationshipArgsMock, mockContext)
    expect(callDeleteLandlordRelationshipAPI).toHaveBeenCalledWith(deleteLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual(landlordRelationshipMock.id)
  })
})

describe('updateLandlord', () => {
  it('should return correctly', async () => {
    const result = await updateLandlord(updateLandlordArgsMock, mockContext)
    expect(callUpdateLandlordAPI).toHaveBeenCalledWith(updateLandlordArgsMock, mockContext)
    expect(result).toEqual(landlordMock)
  })
})
