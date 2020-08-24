import { mockContext } from '../../../__stubs__/context'
import {
  callGetDocumentsAPI,
  callGetDocumentByIdAPI,
  callCreateDocumentAPI,
  callUpdateDocumentAPI,
  callDeleteDocumentAPI,
  callGetDocumentDownloadAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { documentMock } from '../__stubs__/document'
import { documentDownloadArgMock, documentDownloadReturnMock } from '../__stubs__/document-download'
import { documentsMock } from '../__stubs__/documents'
import { createDocumentArgsMock } from '../__stubs__/create-document'
import { updateDocumentArgsMock } from '../__stubs__/update-document'
import { deleteDocumentMockArgs } from '../__stubs__/delete-document'
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

describe('callGetDocumentsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: documentsMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetDocumentsAPI(args, mockContext)
    expect(result).toEqual(documentsMock)
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
      get: jest.fn(() => Promise.resolve({ data: documentMock })),
    })
    const args = { id: documentMock.id }
    const result = await callGetDocumentByIdAPI(args, mockContext)
    expect(result).toEqual(documentMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: documentMock.id }
    const result = await callGetDocumentByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateDocumentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: documentMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(documentMock.id)
    await callCreateDocumentAPI(createDocumentArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateDocumentAPI(createDocumentArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateDocumentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateDocumentAPI(updateDocumentArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateDocumentAPI(updateDocumentArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteDocumentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteDocumentAPI(deleteDocumentMockArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteDocumentAPI(deleteDocumentMockArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetDocumentDownloadAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: documentDownloadReturnMock })),
    })
    const args = documentDownloadArgMock
    const result = await callGetDocumentDownloadAPI(args, mockContext)
    expect(result).toEqual(documentDownloadReturnMock)
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
