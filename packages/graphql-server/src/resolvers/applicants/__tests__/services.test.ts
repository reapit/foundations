import {
  callGetApplicantByIdAPI,
  callGetApplicantsAPI,
  callCreateApplicantAPI,
  callUpdateApplicantAPI,
  callCreateApplicantRelationshipAPI,
  callGetApplicantRelationshipsAPI,
  callGetApplicantRelationshipByIdAPI,
  callDeleteApplicantRelationshipAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { createApplicantArgsMock } from '../__stubs__/mock-create-applicant'
import { updateApplicantArgsMock } from '../__stubs__/mock-update-applicant'
import {
  getApplicantById,
  getApplicants,
  createApplicant,
  updateApplicant,
  getApplicantRelationshipById,
  getApplicantRelationships,
  createApplicantRelationship,
  deleteApplicantRelationship,
} from '../services'
import { applicantMock } from '../__stubs__/mock-applicant'
import { applicantsMock } from '../__stubs__/mock-applicants'
import { relationshipsMock } from '../__stubs__/mock-relationships'
import { relationshipMock } from '../__stubs__/mock-relationship'
import { createRelationshipsArgs } from '../__stubs__/mock-create-relationships'
import { deleteRelationshipMockArgs } from '../__stubs__/mock-delete-relatationships'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetApplicantByIdAPI: jest.fn(() => Promise.resolve(applicantMock)),
  callGetApplicantsAPI: jest.fn(() => Promise.resolve(applicantsMock)),
  callCreateApplicantAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateApplicantAPI: jest.fn(() => Promise.resolve(true)),
  callGetApplicantRelationshipsAPI: jest.fn(() => Promise.resolve(relationshipsMock)),
  callGetApplicantRelationshipByIdAPI: jest.fn(() => Promise.resolve(relationshipMock)),
  callCreateApplicantRelationshipAPI: jest.fn(() => Promise.resolve(relationshipMock)),
  callDeleteApplicantRelationshipAPI: jest.fn(() => Promise.resolve('RPT20000438')),
}))

describe('getApplicantById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getApplicantById(args, mockContext)
    expect(callGetApplicantByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(applicantMock)
  })
})

describe('getApplicants', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getApplicants(args, mockContext)
    expect(callGetApplicantsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(applicantsMock)
  })
})

describe('createApplicant', () => {
  it('should return correctly', async () => {
    const result = await createApplicant(createApplicantArgsMock, mockContext)
    expect(callCreateApplicantAPI).toHaveBeenCalledWith(createApplicantArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateApplicant', () => {
  it('should return correctly', async () => {
    const result = await updateApplicant(updateApplicantArgsMock, mockContext)
    expect(callUpdateApplicantAPI).toHaveBeenCalledWith(updateApplicantArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('getApplicantRelationshipById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await getApplicantRelationshipById(args, mockContext)
    expect(callGetApplicantRelationshipByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(relationshipMock)
  })
})

describe('getApplicantRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: '123', pageSize: 10, pageNumber: 1 }
    const result = await getApplicantRelationships(args, mockContext)
    expect(callGetApplicantRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(relationshipsMock)
  })
})

describe('createApplicantRelationship', () => {
  it('should return correctly', async () => {
    const result = await createApplicantRelationship(createRelationshipsArgs, mockContext)
    expect(callCreateApplicantRelationshipAPI).toHaveBeenCalledWith(createRelationshipsArgs, mockContext)
    expect(result).toEqual(relationshipMock)
  })
})

describe('deleteApplicantRelationship', () => {
  it('should return correctly', async () => {
    const result = await deleteApplicantRelationship(deleteRelationshipMockArgs, mockContext)
    expect(callDeleteApplicantRelationshipAPI).toHaveBeenCalledWith(deleteRelationshipMockArgs, mockContext)
    expect(result).toEqual('RPT20000438')
  })
})
