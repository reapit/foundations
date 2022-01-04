import { ServerContext } from '../../utils'
import {
  GetDocumentByIdArgs,
  CreateDocumentArgs,
  UpdateDocumentArgs,
  GetDocumentsArgs,
  GetDocumentByIdReturn,
  GetDocumentsReturn,
  CreateDocumentReturn,
  UpdateDocumentReturn,
  DeleteDocumentArgs,
  DeleteDocumentReturn,
} from './documents'
import {
  callGetDocumentByIdAPI,
  callGetDocumentsAPI,
  callCreateDocumentAPI,
  callUpdateDocumentAPI,
  callDeleteDocumentAPI,
} from './api'

export const getDocumentById = (args: GetDocumentByIdArgs, context: ServerContext): GetDocumentByIdReturn => {
  const document = callGetDocumentByIdAPI(args, context)
  return document
}

export const getDocuments = (args: GetDocumentsArgs, context: ServerContext): GetDocumentsReturn => {
  const documents = callGetDocumentsAPI(args, context)
  return documents
}

export const createDocument = (args: CreateDocumentArgs, context: ServerContext): CreateDocumentReturn => {
  const createResult = callCreateDocumentAPI(args, context)
  return createResult
}

export const updateDocument = (args: UpdateDocumentArgs, context: ServerContext): UpdateDocumentReturn => {
  const updateResult = callUpdateDocumentAPI({ ...args }, context)
  return updateResult
}

export const deleteDocument = (args: DeleteDocumentArgs, context: ServerContext): DeleteDocumentReturn => {
  const deleteResult = callDeleteDocumentAPI(args, context)
  return deleteResult
}

const documentServices = {
  getDocumentById,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
}

export default documentServices
