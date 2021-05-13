import documentServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
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
} from './documents'

export const queryGetDocumentById = resolverHandler<GetDocumentByIdArgs, QueryGetDocumentByIdReturn>(
  (_: any, args: GetDocumentByIdArgs, context: ServerContext): QueryGetDocumentByIdReturn => {
    const traceId = context.traceId
    logger.info('queryGetDocumentById', { traceId, args })
    return documentServices.getDocumentById(args, context)
  },
)

export const queryGetDocuments = resolverHandler<GetDocumentsArgs, QueryGetDocumentsReturn>(
  (_: any, args: GetDocumentsArgs, context: ServerContext): QueryGetDocumentsReturn => {
    const traceId = context.traceId
    logger.info('queryGetDocuments', { traceId, args })
    return documentServices.getDocuments(args, context)
  },
)

export const mutationCreateDocument = resolverHandler<CreateDocumentArgs, MutationCreateDocumentReturn>(
  (_: any, args: CreateDocumentArgs, context: ServerContext): MutationCreateDocumentReturn => {
    const traceId = context.traceId
    logger.info('mutationCreateDocument', { traceId, args })
    return documentServices.createDocument(args, context)
  },
)

export const mutationUpdateDocument = resolverHandler<UpdateDocumentArgs, MutationUpdateDocumentReturn>(
  (_: any, args: UpdateDocumentArgs, context: ServerContext): MutationUpdateDocumentReturn => {
    const traceId = context.traceId
    logger.info('mutationUpdateDocument', { traceId, args })
    return documentServices.updateDocument(args, context)
  },
)

export const mutationDeleteDocument = resolverHandler<DeleteDocumentArgs, MutationDeleteDocumentReturn>(
  (_: any, args: DeleteDocumentArgs, context: ServerContext): MutationDeleteDocumentReturn => {
    const traceId = context.traceId
    logger.info('mutationDeleteDocument', { traceId, args })
    return documentServices.deleteDocument(args, context)
  },
)

export default {
  Query: {
    GetDocumentById: queryGetDocumentById,
    GetDocuments: queryGetDocuments,
  },
  Mutation: {
    CreateDocument: mutationCreateDocument,
    UpdateDocument: mutationUpdateDocument,
    DeleteDocument: mutationDeleteDocument,
  },
}
