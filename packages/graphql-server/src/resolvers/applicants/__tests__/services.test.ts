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
import { mockCreateApplicantArgs } from '../__stubs__/mock-create-applicant'
import { mockUpdateApplicantArgs } from '../__stubs__/mock-update-applicant'
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
import { mockApplicant } from '../__stubs__/mock-applicant'
import { mockApplicants } from '../__stubs__/mock-applicants'
import { mockRelationships } from '../__stubs__/mock-relationships'
import { mockRelationship } from '../__stubs__/mock-relationship'
import { mockCreateRelationshipsArgs } from '../__stubs__/mock-create-relationships'
import { mockDeleteRelationshipArgs } from '../__stubs__/mock-delete-relatationships'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetApplicantByIdAPI: jest.fn(() => Promise.resolve(mockApplicant)),
  callGetApplicantsAPI: jest.fn(() => Promise.resolve(mockApplicants)),
  callCreateApplicantAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateApplicantAPI: jest.fn(() => Promise.resolve(true)),
  callGetApplicantRelationshipsAPI: jest.fn(() => Promise.resolve(mockRelationships)),
  callGetApplicantRelationshipByIdAPI: jest.fn(() => Promise.resolve(mockRelationship)),
  callCreateApplicantRelationshipAPI: jest.fn(() => Promise.resolve(mockRelationship)),
  callDeleteApplicantRelationshipAPI: jest.fn(() => Promise.resolve('RPT20000438')),
}))

describe('getApplicantById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getApplicantById(args, mockContext)
    expect(callGetApplicantByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockApplicant)
  })
})

describe('getApplicants', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getApplicants(args, mockContext)
    expect(callGetApplicantsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockApplicants)
  })
})

describe('createApplicant', () => {
  it('should return correctly', async () => {
    const result = await createApplicant(mockCreateApplicantArgs, mockContext)
    expect(callCreateApplicantAPI).toHaveBeenCalledWith(mockCreateApplicantArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateApplicant', () => {
  it('should return correctly', async () => {
    const result = await updateApplicant(mockUpdateApplicantArgs, mockContext)
    expect(callUpdateApplicantAPI).toHaveBeenCalledWith(mockUpdateApplicantArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('getApplicantRelationshipById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await getApplicantRelationshipById(args, mockContext)
    expect(callGetApplicantRelationshipByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockRelationship)
  })
})

describe('getApplicantRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: '123', pageSize: 10, pageNumber: 1 }
    const result = await getApplicantRelationships(args, mockContext)
    expect(callGetApplicantRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockRelationships)
  })
})

describe('createApplicantRelationship', () => {
  it('should return correctly', async () => {
    const result = await createApplicantRelationship(mockCreateRelationshipsArgs, mockContext)
    expect(callCreateApplicantRelationshipAPI).toHaveBeenCalledWith(mockCreateRelationshipsArgs, mockContext)
    expect(result).toEqual(mockRelationship)
  })
})

describe('deleteApplicantRelationship', () => {
  it('should return correctly', async () => {
    const result = await deleteApplicantRelationship(mockDeleteRelationshipArgs, mockContext)
    expect(callDeleteApplicantRelationshipAPI).toHaveBeenCalledWith(mockDeleteRelationshipArgs, mockContext)
    expect(result).toEqual('RPT20000438')
  })
})
