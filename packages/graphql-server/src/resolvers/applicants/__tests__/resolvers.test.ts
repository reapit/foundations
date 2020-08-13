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
import { createApplicantArgsMock } from '../__stubs__/create-applicant'
import { updateApplicantArgsMock } from '../__stubs__/update-applicant'
import { applicantMock } from '../__stubs__/applicant'
import { applicantsMock } from '../__stubs__/applicants'
import { mockContext } from '../../../__stubs__/context'
import { relationshipMock } from '../__stubs__/relationship'
import { relationshipsMock } from '../__stubs__/relationships'
import { createRelationshipsArgs } from '../__stubs__/create-relationships'
import { deleteRelationshipMockArgs } from '../__stubs__/delete-relatationships'

jest.mock('../services', () => ({
  getApplicantById: jest.fn(() => applicantMock),
  getApplicants: jest.fn(() => applicantsMock),
  createApplicant: jest.fn(() => true),
  updateApplicant: jest.fn(() => true),
  getApplicantRelationshipById: jest.fn(() => relationshipMock),
  getApplicantRelationships: jest.fn(() => relationshipsMock),
  createApplicantRelationship: jest.fn(() => relationshipMock),
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
    const result = mutationCreateApplicant(null, createApplicantArgsMock, mockContext)
    expect(result).toEqual(applicantsServices.createApplicant(createApplicantArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateApplicant(null, createApplicantArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateApplicant', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateApplicant(null, updateApplicantArgsMock, mockContext)
    expect(result).toEqual(applicantsServices.updateApplicant(updateApplicantArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateApplicant(null, updateApplicantArgsMock, mockContext)
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
    const result = mutationCreateApplicantRelationship(null, createRelationshipsArgs, mockContext)
    expect(result).toEqual(applicantsServices.createApplicantRelationship(createRelationshipsArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateApplicantRelationship(null, createRelationshipsArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteApplicantRelationship', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteApplicantRelationship(null, deleteRelationshipMockArgs, mockContext)
    expect(result).toEqual(applicantsServices.deleteApplicantRelationship(deleteRelationshipMockArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteApplicantRelationship(null, deleteRelationshipMockArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
