import {
  callGetDocumentByIdAPI,
  callGetDocumentsAPI,
  callCreateDocumentAPI,
  callUpdateDocumentAPI,
  callDeleteDocumentAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateDocumentArgs } from '../__stubs__/mock-create-document'
import { mockUpdateDocumentArgs } from '../__stubs__/mock-update-document'
import { mockDeleteDocumentArgs } from '../__stubs__/mock-delete-document'
import { mockDocument } from '../__stubs__/mock-document'
import { mockDocuments } from '../__stubs__/mock-documents'
import { getDocumentById, getDocuments, createDocument, updateDocument } from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetDocumentByIdAPI: jest.fn(() => Promise.resolve(mockDocument)),
  callGetDocumentsAPI: jest.fn(() => Promise.resolve(mockDocuments)),
  callCreateDocumentAPI: jest.fn(() => Promise.resolve(mockDocument)),
  callUpdateDocumentAPI: jest.fn(() => Promise.resolve(mockDocument)),
  callDeleteDocumentAPI: jest.fn(() => Promise.resolve('RPT20000438')),
}))

describe('getDocumentById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getDocumentById(args, mockContext)
    expect(callGetDocumentByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockDocument)
  })
})

describe('getDocuments', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getDocuments(args, mockContext)
    expect(callGetDocumentsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockDocuments)
  })
})

describe('createDocument', () => {
  it('should return correctly', async () => {
    const result = await createDocument(mockCreateDocumentArgs, mockContext)
    expect(callCreateDocumentAPI).toHaveBeenCalledWith(mockCreateDocumentArgs, mockContext)
    expect(result).toEqual(mockDocument)
  })
})

describe('updateDocument', () => {
  it('should return correctly', async () => {
    const result = await updateDocument(mockUpdateDocumentArgs, mockContext)
    expect(callUpdateDocumentAPI).toHaveBeenCalledWith(mockUpdateDocumentArgs, mockContext)
    expect(result).toEqual(mockDocument)
  })
})

describe('deleteDocument', () => {
  it('should return correctly', async () => {
    const result = await callDeleteDocumentAPI(mockDeleteDocumentArgs, mockContext)
    expect(callDeleteDocumentAPI).toHaveBeenCalledWith(mockDeleteDocumentArgs, mockContext)
    expect(result).toEqual('RPT20000438')
  })
})
