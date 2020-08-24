import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  DocumentModel,
  CreateDocumentModel,
  PagedResultDocumentModel_,
  UpdateDocumentModel,
  FileResult,
} from '../../types'

export type GetDocumentByIdArgs = {
  id: string
  embed?: 'documentType'[]
}

export type GetDocumentsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: 'documentType'[]
  id?: string[]
  associatedId?: string[]
  associatedType?: (
    | 'appliance'
    | 'applicant'
    | 'bankStatement'
    | 'batch'
    | 'certificate'
    | 'contact'
    | 'depositCertificate'
    | 'estate'
    | 'estateUnit'
    | 'idCheck'
    | 'keySet'
    | 'landlord'
    | 'nominalTransaction'
    | 'property'
    | 'tenancy'
    | 'tenancyCheck'
    | 'tenancyRenewal'
    | 'worksOrder'
  )[]
  typeId?: string[]
  metadata?: string[]
}

export type CreateDocumentArgs = CreateDocumentModel
export type UpdateDocumentArgs = { id: string; _eTag: string } & UpdateDocumentModel

export type DeleteDocumentArgs = {
  id: string
}

export type GetDocumentDownloadArgs = {
  id: string
}
// api type
export type GetDocumentByIdReturn = Promise<DocumentModel | UserInputError>
export type GetDocumentsReturn = Promise<PagedResultDocumentModel_ | UserInputError>
export type CreateDocumentReturn = Promise<DocumentModel | UserInputError>
export type UpdateDocumentReturn = Promise<DocumentModel | UserInputError>
export type DeleteDocumentReturn = Promise<string | UserInputError>
export type GetDocumentDownloadReturn = Promise<FileResult | UserInputError>

// resolver type
export type QueryGetDocumentByIdReturn = AuthenticationError | GetDocumentByIdReturn
export type QueryGetDocumentsReturn = AuthenticationError | GetDocumentsReturn
export type MutationCreateDocumentReturn = AuthenticationError | CreateDocumentReturn
export type MutationUpdateDocumentReturn = AuthenticationError | UpdateDocumentReturn
export type MutationDeleteDocumentReturn = AuthenticationError | DeleteDocumentReturn
export type QueryGetDocumentDownloadReturn = AuthenticationError | GetDocumentDownloadReturn
