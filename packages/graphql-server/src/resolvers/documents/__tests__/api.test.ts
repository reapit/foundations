import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetDocumentsAPI,
  callGetDocumentByIdAPI,
  callCreateDocumentAPI,
  callUpdateDocumentAPI,
  callDeleteDocumentAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockDocument } from '../__stubs__/mock-document'
import { mockDocuments } from '../__stubs__/mock-documents'
import { mockCreateDocumentArgs } from '../__stubs__/mock-create-document'
import { mockUpdateDocumentArgs } from '../__stubs__/mock-update-document'
import { mockDeleteDocumentArgs } from '../__stubs__/mock-delete-document'
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

describe('callGetDocumentsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockDocuments })),
    })
    const args = { pageSize: 1 }
    const result = await callGetDocumentsAPI(args, mockContext)
    expect(result).toEqual(mockDocuments)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetDocumentsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetDocumentByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockDocument })),
    })
    const args = { id: mockDocument.id }
    const result = await callGetDocumentByIdAPI(args, mockContext)
    expect(result).toEqual(mockDocument)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockDocument.id }
    const result = await callGetDocumentByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateDocumentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockDocument })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockDocument.id)
    await callCreateDocumentAPI(mockCreateDocumentArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateDocumentAPI(mockCreateDocumentArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateDocumentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateDocumentAPI(mockUpdateDocumentArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateDocumentAPI(mockUpdateDocumentArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteDocumentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteDocumentAPI(mockDeleteDocumentArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteDocumentAPI(mockDeleteDocumentArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
