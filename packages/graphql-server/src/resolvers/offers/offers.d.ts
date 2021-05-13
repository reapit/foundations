import { UserInputError } from 'apollo-server-lambda'
import {
  OfferModel,
  CreateOfferModel,
  UpdateOfferModel,
  OfferModelPagedResult,
} from '@reapit/foundations-ts-definitions'

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
export type GetOffersReturn = Promise<OfferModelPagedResult | UserInputError>
export type CreateOfferReturn = Promise<OfferModel | UserInputError>
export type UpdateOfferReturn = Promise<OfferModel | UserInputError>

// resolver type
export type QueryGetOfferByIdReturn = GetOfferByIdReturn
export type QueryGetOffersReturn = GetOffersReturn
export type MutationCreateOfferReturn = CreateOfferReturn
export type MutationUpdateOfferReturn = UpdateOfferReturn
