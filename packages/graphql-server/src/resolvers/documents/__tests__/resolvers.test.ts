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
import { mockCreateDocumentArgs } from '../__stubs__/mock-create-document'
import { mockUpdateDocumentArgs } from '../__stubs__/mock-update-document'
import { mockDeleteDocumentArgs } from '../__stubs__/mock-delete-document'
import { mockDocument } from '../__stubs__/mock-document'
import { mockDocuments } from '../__stubs__/mock-documents'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getDocumentById: jest.fn(() => mockDocument),
  getDocuments: jest.fn(() => mockDocuments),
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
    const result = mutationCreateDocument(null, mockCreateDocumentArgs, mockContext)
    expect(result).toEqual(documentsServices.createDocument(mockCreateDocumentArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateDocument(null, mockCreateDocumentArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateDocument', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateDocument(null, mockUpdateDocumentArgs, mockContext)
    expect(result).toEqual(documentsServices.updateDocument(mockUpdateDocumentArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateDocument(null, mockUpdateDocumentArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteDocument', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteDocument(null, mockDeleteDocumentArgs, mockContext)
    expect(result).toEqual(documentsServices.deleteDocument(mockDeleteDocumentArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteDocument(null, mockDeleteDocumentArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
