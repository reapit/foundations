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
  mockLandlord,
  mockLandlordsList,
  mockLandlordRelationship,
  mockLandlordRelationshipsList,
} from '../__stubs__/mock-landlord-query'
import {
  mockCreateLandlordArgs,
  mockUpdateLandlordArgs,
  mockCreateLandlordRelationshipArgs,
  mockDeleteLandlordRelationshipArgs,
} from '../__stubs__/mock-landlord-mutation'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getLandlordById: jest.fn(() => mockLandlord),
  getLandlords: jest.fn(() => mockLandlordsList),
  getLandlordRelationships: jest.fn(() => mockLandlordRelationshipsList),
  getLandlordRelationshipById: jest.fn(() => mockLandlordRelationship),
  createLandlord: jest.fn(() => mockLandlord),
  createLandlordRelationship: jest.fn(() => mockLandlordRelationshipsList),
  deleteLandlordRelationship: jest.fn(() => mockLandlordRelationship.id),
  updateLandlord: jest.fn(() => mockLandlord),
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
    const result = mutationCreateLandlord(null, mockCreateLandlordArgs, mockContext)
    expect(result).toEqual(landlordServices.createLandlord(mockCreateLandlordArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateLandlord(null, mockCreateLandlordArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateLandlordRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateLandlordRelationship(null, mockCreateLandlordRelationshipArgs, mockContext)
    expect(result).toEqual(landlordServices.createLandlordRelationship(mockCreateLandlordRelationshipArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateLandlord(null, mockCreateLandlordArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteLandlordRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteLandlordRelationship(null, mockDeleteLandlordRelationshipArgs, mockContext)
    expect(result).toEqual(landlordServices.deleteLandlordRelationship(mockDeleteLandlordRelationshipArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteLandlordRelationship(null, mockDeleteLandlordRelationshipArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateLandlord', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateLandlord(null, mockUpdateLandlordArgs, mockContext)
    expect(result).toEqual(landlordServices.updateLandlord(mockUpdateLandlordArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateLandlord(null, mockUpdateLandlordArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
