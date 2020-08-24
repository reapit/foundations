import logger from '../../logger'
import { ServerContext } from '../../index'
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
  GetDocumentDownloadArgs,
  GetDocumentDownloadReturn,
} from './documents'
import {
  callGetDocumentByIdAPI,
  callGetDocumentsAPI,
  callCreateDocumentAPI,
  callUpdateDocumentAPI,
  callDeleteDocumentAPI,
  callGetDocumentDownloadAPI,
} from './api'

export const getDocumentById = (args: GetDocumentByIdArgs, context: ServerContext): GetDocumentByIdReturn => {
  const traceId = context.traceId
  logger.info('getDocumentById', { traceId, args })
  const document = callGetDocumentByIdAPI(args, context)
  return document
}

export const getDocuments = (args: GetDocumentsArgs, context: ServerContext): GetDocumentsReturn => {
  const traceId = context.traceId
  logger.info('getDocuments', { traceId, args })
  const documents = callGetDocumentsAPI(args, context)
  return documents
}

export const createDocument = (args: CreateDocumentArgs, context: ServerContext): CreateDocumentReturn => {
  const traceId = context.traceId
  logger.info('createDocument', { traceId, args })
  const createResult = callCreateDocumentAPI(args, context)
  return createResult
}

export const updateDocument = (args: UpdateDocumentArgs, context: ServerContext): UpdateDocumentReturn => {
  const traceId = context.traceId
  logger.info('updateDocument', { traceId, args })
  const updateResult = callUpdateDocumentAPI({ ...args }, context)
  return updateResult
}

export const deleteDocument = (args: DeleteDocumentArgs, context: ServerContext): DeleteDocumentReturn => {
  const traceId = context.traceId
  logger.info('deleteDocument', { traceId, args })
  const deleteResult = callDeleteDocumentAPI(args, context)
  return deleteResult
}

export const getDocumentDownload = (
  args: GetDocumentDownloadArgs,
  context: ServerContext,
): GetDocumentDownloadReturn => {
  const traceId = context.traceId
  logger.info('getDocumentDownload', { traceId, args })
  const documents = callGetDocumentDownloadAPI(args, context)
  return documents
}

const documentServices = {
  getDocumentById,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentDownload,
}

export default documentServices
