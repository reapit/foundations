import applicantsServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetApplicantById,
  queryGetApplicants,
  mutationCreateApplicant,
  mutationUpdateApplicant,
  queryGetApplicantRelationshipById,
  queryGetApplicantRelationships,
  mutationCreateApplicantRelationship,
  mutationDeleteApplicantRelationship,
} from '../resolvers'
import { mockCreateApplicantArgs } from '../__stubs__/mock-create-applicant'
import { mockUpdateApplicantArgs } from '../__stubs__/mock-update-applicant'
import { mockApplicant } from '../__stubs__/mock-applicant'
import { mockApplicants } from '../__stubs__/mock-applicants'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockRelationship } from '../__stubs__/mock-relationship'
import { mockRelationships } from '../__stubs__/mock-relationships'
import { mockCreateRelationshipsArgs } from '../__stubs__/mock-create-relationships'
import { mockDeleteRelationshipArgs } from '../__stubs__/mock-delete-relatationships'

jest.mock('../services', () => ({
  getApplicantById: jest.fn(() => mockApplicant),
  getApplicants: jest.fn(() => mockApplicants),
  createApplicant: jest.fn(() => true),
  updateApplicant: jest.fn(() => true),
  getApplicantRelationshipById: jest.fn(() => mockRelationship),
  getApplicantRelationships: jest.fn(() => mockRelationships),
  createApplicantRelationship: jest.fn(() => mockRelationship),
  deleteApplicantRelationship: jest.fn(() => 'relationshipID'),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetApplicantById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetApplicantById(null, args, mockContext)
    expect(result).toEqual(applicantsServices.getApplicantById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetApplicantById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetApplicants', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetApplicants(null, args, mockContext)
    expect(result).toEqual(applicantsServices.getApplicants(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetApplicants(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateApplicant', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateApplicant(null, mockCreateApplicantArgs, mockContext)
    expect(result).toEqual(applicantsServices.createApplicant(mockCreateApplicantArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateApplicant(null, mockCreateApplicantArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateApplicant', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateApplicant(null, mockUpdateApplicantArgs, mockContext)
    expect(result).toEqual(applicantsServices.updateApplicant(mockUpdateApplicantArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateApplicant(null, mockUpdateApplicantArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetApplicantRelationshipById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = queryGetApplicantRelationshipById(null, args, mockContext)
    expect(result).toEqual(applicantsServices.getApplicantRelationshipById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = queryGetApplicantRelationshipById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetApplicantRelationships', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id', pageSize: 10, pageNumber: 1 }
    const result = queryGetApplicantRelationships(null, args, mockContext)
    expect(result).toEqual(applicantsServices.getApplicantRelationships(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id', pageSize: 10, pageNumber: 1 }
    const result = queryGetApplicantRelationships(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateApplicantRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateApplicantRelationship(null, mockCreateRelationshipsArgs, mockContext)
    expect(result).toEqual(applicantsServices.createApplicantRelationship(mockCreateRelationshipsArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateApplicantRelationship(null, mockCreateRelationshipsArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteApplicantRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteApplicantRelationship(null, mockDeleteRelationshipArgs, mockContext)
    expect(result).toEqual(applicantsServices.deleteApplicantRelationship(mockDeleteRelationshipArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteApplicantRelationship(null, mockDeleteRelationshipArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
