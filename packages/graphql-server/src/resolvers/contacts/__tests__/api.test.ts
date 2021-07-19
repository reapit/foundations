import { mockContext } from '../../../__stubs__/mock-context'
import { callGetContactByIdAPI, callUpdateContactAPI, callCreateContactAPI, callGetContactsAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockContact } from '../__stubs__/mock-contact'
import { mockContacts } from '../__stubs__/mock-contacts'
import { mockCreateContactArgs } from '../__stubs__/mock-create-contact'
import { mockUpdateContactArgs } from '../__stubs__/mock-update-contact'
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

describe('callGetContactsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockContacts })),
    })
    const args = { pageSize: 1 }
    const result = await callGetContactsAPI(args, mockContext)
    expect(result).toEqual(mockContacts)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetContactsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetContactByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockContact })),
    })
    const args = { id: mockContact.id } as any
    const result = await callGetContactByIdAPI(args, mockContext)
    expect(result).toEqual(mockContact)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockContact.id } as any
    const result = await callGetContactByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateContactAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockContact })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockContact.id)
    await callCreateContactAPI(mockCreateContactArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateContactAPI(mockCreateContactArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateContactAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateContactAPI(mockUpdateContactArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateContactAPI(mockUpdateContactArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
