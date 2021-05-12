import { UserInputError } from 'apollo-server-lambda'
import {
  DocumentModel,
  CreateDocumentModel,
  DocumentModelPagedResult,
  UpdateDocumentModel,
} from '@reapit/foundations-ts-definitions'

export type DocumentEmbed = 'documentType'

export type GetDocumentByIdArgs = {
  id: string
  embed?: DocumentEmbed[]
}

export type GetDocumentsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: DocumentEmbed[]
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
export type GetDocumentsReturn = Promise<DocumentModelPagedResult | UserInputError>
export type CreateDocumentReturn = Promise<DocumentModel | UserInputError>
export type UpdateDocumentReturn = Promise<DocumentModel | UserInputError>
export type DeleteDocumentReturn = Promise<string | UserInputError>

// resolver type
export type QueryGetDocumentByIdReturn = GetDocumentByIdReturn
export type QueryGetDocumentsReturn = GetDocumentsReturn
export type MutationCreateDocumentReturn = CreateDocumentReturn
export type MutationUpdateDocumentReturn = UpdateDocumentReturn
export type MutationDeleteDocumentReturn = DeleteDocumentReturn
