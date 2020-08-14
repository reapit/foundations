import landlordServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetLandlords,
  queryGetLandlordById,
  queryGetLandlordRelationshipById,
  queryGetLandlordRelationships,
  mutationCreateLandlord,
  mutationUpdateLandlord,
  mutationCreateLandlordRelationship,
  mutationDeleteLandlordRelationship,
} from '../resolvers'
import {
  landlordMock,
  landlordsListMock,
  landlordRelationshipMock,
  landlordRelationshipsListMock,
} from '../__stubs__/landlord-query'
import {
  createLandlordArgsMock,
  updateLandlordArgsMock,
  createLandlordRelationshipArgsMock,
  deleteLandlordRelationshipArgsMock,
} from '../__stubs__/landlord-mutation'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getLandlordById: jest.fn(() => landlordMock),
  getLandlords: jest.fn(() => landlordsListMock),
  getLandlordRelationships: jest.fn(() => landlordRelationshipsListMock),
  getLandlordRelationshipById: jest.fn(() => landlordRelationshipMock),
  createLandlord: jest.fn(() => landlordMock),
  createLandlordRelationship: jest.fn(() => landlordRelationshipsListMock),
  deleteLandlordRelationship: jest.fn(() => landlordRelationshipMock.id),
  updateLandlord: jest.fn(() => landlordMock),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetLandlords', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { pageSize: 1 }
    const result = queryGetLandlords(null, args, mockContext)
    expect(result).toEqual(landlordServices.getLandlords(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { pageSize: 1 }
    const result = queryGetLandlords(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetLandlordById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113' }
    const result = queryGetLandlordById(null, args, mockContext)
    expect(result).toEqual(landlordServices.getLandlordById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113' }
    const result = queryGetLandlordById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetLandlordRelationships', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113' }
    const result = queryGetLandlordRelationships(null, args, mockContext)
    expect(result).toEqual(landlordServices.getLandlordRelationships(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113' }
    const result = queryGetLandlordRelationships(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetLandlordRelationshipById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113', relationshipId: 'RPT20000517' }
    const result = queryGetLandlordRelationshipById(null, args, mockContext)
    expect(result).toEqual(landlordServices.getLandlordRelationshipById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113', relationshipId: 'RPT20000517' }
    const result = queryGetLandlordRelationshipById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateLandlord', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateLandlord(null, createLandlordArgsMock, mockContext)
    expect(result).toEqual(landlordServices.createLandlord(createLandlordArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateLandlord(null, createLandlordArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateLandlordRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateLandlordRelationship(null, createLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual(landlordServices.createLandlordRelationship(createLandlordRelationshipArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateLandlord(null, createLandlordArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteLandlordRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteLandlordRelationship(null, deleteLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual(landlordServices.deleteLandlordRelationship(deleteLandlordRelationshipArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteLandlordRelationship(null, deleteLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateLandlord', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateLandlord(null, updateLandlordArgsMock, mockContext)
    expect(result).toEqual(landlordServices.updateLandlord(updateLandlordArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateLandlord(null, updateLandlordArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
