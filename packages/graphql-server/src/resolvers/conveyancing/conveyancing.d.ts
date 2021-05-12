import { UserInputError } from 'apollo-server-lambda'
import {
  ConveyancingModel,
  ConveyancingModelPagedResult,
  UpdateConveyancingModel,
  CreateDownwardLinkModel,
  CreateUpwardLinkModel,
} from '@reapit/foundations-ts-definitions'

export type UpdateConveyancingArgs = { id: string; _eTag: string } & UpdateConveyancingModel

export type GetConveyancingByIdArgs = {
  id: string
  embed?: string[]
}

export type GetConveyancingArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  propertyId?: string[]
  embed?: ('buyerSolicitor' | 'offer' | 'property' | 'vendor' | 'vendorSolicitor')[]
  metadata?: string[]
}

export type GetConveyancingChainArgs = {
  pageSize?: number
  pageNumber?: number
  id?: string[]
  sortBy?: string
}

export type CreateUpwardLinkModelArgs = { id: string } & CreateUpwardLinkModel

export type DeleteUpwardLinkModelArgs = { id: string }

export type CreateDownwardLinkModelArgs = { id: string } & CreateDownwardLinkModel

export type DeleteDownwardLinkModelArgs = { id: string }

// api return type
export type GetConveyancingByIdReturn = Promise<ConveyancingModel | UserInputError>
export type GetConveyancingReturn = Promise<ConveyancingModelPagedResult | UserInputError>
export type GetConveyancingChainReturn = Promise<ConveyancingModelPagedResult | UserInputError>
export type UpdateConveyancingReturn = Promise<ConveyancingModel | UserInputError>
export type CreateUpwardLinkModelReturn = Promise<ConveyancingModel | UserInputError>
export type DeleteUpwardLinkModelReturn = Promise<String | UserInputError>
export type CreateDownwardLinkModelReturn = Promise<ConveyancingModel | UserInputError>
export type DeleteDownwardLinkModelReturn = Promise<String | UserInputError>

// resolver type
export type QueryGetConveyancingByIdReturn = GetConveyancingByIdReturn
export type QueryGetConveyancingReturn = GetConveyancingReturn
export type QueryGetConveyancingChainReturn = GetConveyancingChainReturn
export type MutationUpdateConveyancingReturn = UpdateConveyancingReturn
export type MutationCreateUpwardLinkModelReturn = CreateUpwardLinkModelReturn
export type MutationDeleteUpwardLinkModelReturn = DeleteUpwardLinkModelReturn
export type MutationCreateDownwardLinkModelReturn = CreateDownwardLinkModelReturn
export type MutationDeleteDownwardLinkModelReturn = DeleteDownwardLinkModelReturn
