import documentServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../index'
import {
  GetDocumentByIdArgs,
  CreateDocumentArgs,
  GetDocumentsArgs,
  UpdateDocumentArgs,
  QueryGetDocumentByIdReturn,
  QueryGetDocumentsReturn,
  MutationCreateDocumentReturn,
  MutationUpdateDocumentReturn,
  DeleteDocumentArgs,
  MutationDeleteDocumentReturn,
  GetDocumentDownloadArgs,
  QueryGetDocumentDownloadReturn,
} from './documents'

export const queryGetDocumentById = (
  _: any,
  args: GetDocumentByIdArgs,
  context: ServerContext,
): QueryGetDocumentByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetDocumentById', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return documentServices.getDocumentById(args, context)
}

export const queryGetDocuments = (_: any, args: GetDocumentsArgs, context: ServerContext): QueryGetDocumentsReturn => {
  const traceId = context.traceId
  logger.info('queryGetDocuments', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return documentServices.getDocuments(args, context)
}

export const mutationCreateDocument = (
  _: any,
  args: CreateDocumentArgs,
  context: ServerContext,
): MutationCreateDocumentReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateDocument', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return documentServices.createDocument(args, context)
}

export const mutationUpdateDocument = (
  _: any,
  args: UpdateDocumentArgs,
  context: ServerContext,
): MutationUpdateDocumentReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateDocument', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return documentServices.updateDocument(args, context)
}

export const mutationDeleteDocument = (
  _: any,
  args: DeleteDocumentArgs,
  context: ServerContext,
): MutationDeleteDocumentReturn => {
  const traceId = context.traceId
  logger.info('mutationDeleteDocument', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return documentServices.deleteDocument(args, context)
}

export const queryGetDocumentDownload = (
  _: any,
  args: GetDocumentDownloadArgs,
  context: ServerContext,
): QueryGetDocumentDownloadReturn => {
  const traceId = context.traceId
  logger.info('queryGetDocumentDownload', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return documentServices.getDocumentDownload(args, context)
}

export default {
  Query: {
    GetDocumentById: queryGetDocumentById,
    GetDocuments: queryGetDocuments,
    GetDocumentDownload: queryGetDocumentDownload,
  },
  Mutation: {
    CreateDocument: mutationCreateDocument,
    UpdateDocument: mutationUpdateDocument,
    DeleteDocument: mutationDeleteDocument,
  },
}
