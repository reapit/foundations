import { mockContext } from '../../../__stubs__/context'
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
import { applicantMock } from '../__stubs__/applicant'
import { applicantsMock } from '../__stubs__/applicants'
import { relationshipMock } from '../__stubs__/relationship'
import { relationshipsMock } from '../__stubs__/relationships'
import { createApplicantArgsMock } from '../__stubs__/create-applicant'
import { createRelationshipsArgs } from '../__stubs__/create-relationships'
import { updateApplicantArgsMock } from '../__stubs__/update-applicant'
import { deleteRelationshipMockArgs } from '../__stubs__/delete-relatationships'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

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
      get: jest.fn(() => Promise.resolve({ data: applicantsMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetApplicantsAPI(args, mockContext)
    expect(result).toEqual(applicantsMock)
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
      get: jest.fn(() => Promise.resolve({ data: applicantMock })),
    })
    const args = { id: applicantMock.id }
    const result = await callGetApplicantByIdAPI(args, mockContext)
    expect(result).toEqual(applicantMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: applicantMock.id }
    const result = await callGetApplicantByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetApplicantRelationshipByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: relationshipMock })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetApplicantRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual(relationshipMock)
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
      get: jest.fn(() => Promise.resolve({ data: relationshipsMock })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetApplicantRelationshipsAPI(args, mockContext)
    expect(result).toEqual(relationshipsMock)
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
      get: jest.fn(() => Promise.resolve({ data: applicantMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(applicantMock.id)
    await callCreateApplicantAPI(createApplicantArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateApplicantAPI(createApplicantArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateApplicantRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateApplicantRelationshipAPI(createRelationshipsArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateApplicantRelationshipAPI(createRelationshipsArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateApplicantAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateApplicantAPI(updateApplicantArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateApplicantAPI(updateApplicantArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteApplicantRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteApplicantRelationshipAPI(deleteRelationshipMockArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteApplicantRelationshipAPI(deleteRelationshipMockArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
