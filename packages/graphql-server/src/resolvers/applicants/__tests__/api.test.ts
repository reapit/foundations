import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetApplicantsAPI,
  callGetApplicantByIdAPI,
  callGetApplicantRelationshipsAPI,
  callGetApplicantRelationshipByIdAPI,
  callCreateApplicantAPI,
  callUpdateApplicantAPI,
  callCreateApplicantRelationshipAPI,
  callDeleteApplicantRelationshipAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockApplicant } from '../__stubs__/mock-applicant'
import { mockApplicants } from '../__stubs__/mock-applicants'
import { mockRelationship } from '../__stubs__/mock-relationship'
import { mockRelationships } from '../__stubs__/mock-relationships'
import { mockCreateApplicantArgs } from '../__stubs__/mock-create-applicant'
import { mockCreateRelationshipsArgs } from '../__stubs__/mock-create-relationships'
import { mockUpdateApplicantArgs } from '../__stubs__/mock-update-applicant'
import { mockDeleteRelationshipArgs } from '../__stubs__/mock-delete-relatationships'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
})

jest.mock('../../../utils/get-id-from-create-headers', () => ({
  getIdFromCreateHeaders: jest.fn(),
}))

jest.mock('../../../utils/handle-error', () => ({
  handleError: jest.fn(() => Promise.resolve('caught error')),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}))

describe('callGetApplicantsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockApplicants })),
    })
    const args = { pageSize: 1 }
    const result = await callGetApplicantsAPI(args, mockContext)
    expect(result).toEqual(mockApplicants)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetApplicantsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetApplicantByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockApplicant })),
    })
    const args = { id: mockApplicant.id }
    const result = await callGetApplicantByIdAPI(args, mockContext)
    expect(result).toEqual(mockApplicant)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockApplicant.id }
    const result = await callGetApplicantByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetApplicantRelationshipByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockRelationship })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetApplicantRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual(mockRelationship)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetApplicantRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetApplicantRelationshipsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockRelationships })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetApplicantRelationshipsAPI(args, mockContext)
    expect(result).toEqual(mockRelationships)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetApplicantRelationshipsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateApplicantAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockApplicant })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockApplicant.id)
    await callCreateApplicantAPI(mockCreateApplicantArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateApplicantAPI(mockCreateApplicantArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateApplicantRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateApplicantRelationshipAPI(mockCreateRelationshipsArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateApplicantRelationshipAPI(mockCreateRelationshipsArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateApplicantAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateApplicantAPI(mockUpdateApplicantArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateApplicantAPI(mockUpdateApplicantArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteApplicantRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteApplicantRelationshipAPI(mockDeleteRelationshipArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteApplicantRelationshipAPI(mockDeleteRelationshipArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
