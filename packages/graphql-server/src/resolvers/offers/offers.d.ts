import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { OfferModel, CreateOfferModel, UpdateOfferModel, PagedResultOfferModel_ } from '../../types'

export type CreateOfferArgs = CreateOfferModel

export type UpdateOfferArgs = { id: string; _eTag: string } & UpdateOfferModel

export type Embed = ('applicant' | 'conveyancing' | 'property' | 'negotiator')[]

export type GetOfferByIdArgs = {
  id: string
  embed?: Embed
}

export type GetOffersArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: Embed
  id?: string[]
  applicantId?: string[]
  propertyId?: string[]
  status?: string[]
  address?: string
  name?: string
  amountFrom?: number
  amountTo?: number
  dateFrom?: string
  dateTo?: string
  metadata?: string[]
}

// api return type
export type GetOfferByIdReturn = Promise<OfferModel | UserInputError>
export type GetOffersReturn = Promise<PagedResultOfferModel_ | UserInputError>
export type CreateOfferReturn = Promise<OfferModel | UserInputError>
export type UpdateOfferReturn = Promise<OfferModel | UserInputError>

// resolver type
export type QueryGetOfferByIdReturn = AuthenticationError | GetOfferByIdReturn
export type QueryGetOffersReturn = AuthenticationError | GetOffersReturn
export type MutationCreateOfferReturn = AuthenticationError | CreateOfferReturn
export type MutationUpdateOfferReturn = AuthenticationError | UpdateOfferReturn
