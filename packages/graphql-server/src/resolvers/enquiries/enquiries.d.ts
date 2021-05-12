import { UserInputError } from 'apollo-server-lambda'
import { EnquiryModel, EnquiryModelPagedResult, CreateEnquiryModel } from '@reapit/foundations-ts-definitions'

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
export type GetEnquiriesReturn = Promise<EnquiryModelPagedResult | UserInputError>
export type CreateEnquiryReturn = Promise<EnquiryModel | UserInputError>

// resolver type
export type QueryGetEnquiryByIdReturn = GetEnquiryByIdReturn
export type QueryGetEnquiriesReturn = GetEnquiriesReturn
export type MutationCreateEnquiryReturn = CreateEnquiryReturn
