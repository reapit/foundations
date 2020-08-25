import {
  callGetDocumentByIdAPI,
  callGetDocumentsAPI,
  callCreateDocumentAPI,
  callUpdateDocumentAPI,
  callDeleteDocumentAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/context'
import { createDocumentArgsMock } from '../__stubs__/create-document'
import { updateDocumentArgsMock } from '../__stubs__/update-document'
import { deleteDocumentMockArgs } from '../__stubs__/delete-document'
import { documentMock } from '../__stubs__/document'
import { documentsMock } from '../__stubs__/documents'
import { getDocumentById, getDocuments, createDocument, updateDocument } from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetDocumentByIdAPI: jest.fn(() => Promise.resolve(documentMock)),
  callGetDocumentsAPI: jest.fn(() => Promise.resolve(documentsMock)),
  callCreateDocumentAPI: jest.fn(() => Promise.resolve(documentMock)),
  callUpdateDocumentAPI: jest.fn(() => Promise.resolve(documentMock)),
  callDeleteDocumentAPI: jest.fn(() => Promise.resolve('RPT20000438')),
}))

describe('getDocumentById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getDocumentById(args, mockContext)
    expect(callGetDocumentByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(documentMock)
  })
})

describe('getDocuments', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getDocuments(args, mockContext)
    expect(callGetDocumentsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(documentsMock)
  })
})

describe('createDocument', () => {
  it('should return correctly', async () => {
    const result = await createDocument(createDocumentArgsMock, mockContext)
    expect(callCreateDocumentAPI).toHaveBeenCalledWith(createDocumentArgsMock, mockContext)
    expect(result).toEqual(documentMock)
  })
})

describe('updateDocument', () => {
  it('should return correctly', async () => {
    const result = await updateDocument(updateDocumentArgsMock, mockContext)
    expect(callUpdateDocumentAPI).toHaveBeenCalledWith(updateDocumentArgsMock, mockContext)
    expect(result).toEqual(documentMock)
  })
})

describe('deleteDocument', () => {
  it('should return correctly', async () => {
    const result = await callDeleteDocumentAPI(deleteDocumentMockArgs, mockContext)
    expect(callDeleteDocumentAPI).toHaveBeenCalledWith(deleteDocumentMockArgs, mockContext)
    expect(result).toEqual('RPT20000438')
  })
})
