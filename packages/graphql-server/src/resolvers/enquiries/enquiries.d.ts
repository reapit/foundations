import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { EnquiryModel, PagedResultEnquiryModel_, CreateEnquiryModel } from '../../types'

export type CreateEnquiryArgs = CreateEnquiryModel

export type GetEnquiryByIdArgs = {
  id: number
}

export type GetEnquiriesArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  enquiryType?: string
  createdFrom?: string
  createdTo?: string
}

// api return type
export type GetEnquiryByIdReturn = Promise<EnquiryModel | UserInputError>
export type GetEnquiriesReturn = Promise<PagedResultEnquiryModel_ | UserInputError>
export type CreateEnquiryReturn = Promise<EnquiryModel | UserInputError>

// resolver type
export type QueryGetEnquiryByIdReturn = AuthenticationError | GetEnquiryByIdReturn
export type QueryGetEnquiriesReturn = AuthenticationError | GetEnquiriesReturn
export type MutationCreateEnquiryReturn = AuthenticationError | CreateEnquiryReturn
