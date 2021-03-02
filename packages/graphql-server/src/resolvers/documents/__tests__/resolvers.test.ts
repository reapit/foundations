import documentsServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetDocumentById,
  queryGetDocuments,
  mutationCreateDocument,
  mutationUpdateDocument,
  mutationDeleteDocument,
} from '../resolvers'
import { createDocumentArgsMock } from '../__stubs__/mock-create-document'
import { updateDocumentArgsMock } from '../__stubs__/mock-update-document'
import { deleteDocumentMockArgs } from '../__stubs__/mock-delete-document'
import { documentMock } from '../__stubs__/mock-document'
import { documentsMock } from '../__stubs__/mock-documents'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getDocumentById: jest.fn(() => documentMock),
  getDocuments: jest.fn(() => documentsMock),
  createDocument: jest.fn(() => true),
  updateDocument: jest.fn(() => true),
  deleteDocument: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetDocumentById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetDocumentById(null, args, mockContext)
    expect(result).toEqual(documentsServices.getDocumentById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetDocumentById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetDocuments', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetDocuments(null, args, mockContext)
    expect(result).toEqual(documentsServices.getDocuments(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetDocuments(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateDocument', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateDocument(null, createDocumentArgsMock, mockContext)
    expect(result).toEqual(documentsServices.createDocument(createDocumentArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateDocument(null, createDocumentArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateDocument', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateDocument(null, updateDocumentArgsMock, mockContext)
    expect(result).toEqual(documentsServices.updateDocument(updateDocumentArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateDocument(null, updateDocumentArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteDocument', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteDocument(null, deleteDocumentMockArgs, mockContext)
    expect(result).toEqual(documentsServices.deleteDocument(deleteDocumentMockArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteDocument(null, deleteDocumentMockArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
