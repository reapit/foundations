import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  ConveyancingModel,
  PagedResultConveyancingModel_,
  UpdateConveyancingModel,
  CreateDownwardLinkModel,
  CreateUpwardLinkModel,
} from '../../types'

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
export type GetConveyancingReturn = Promise<PagedResultConveyancingModel_ | UserInputError>
export type GetConveyancingChainReturn = Promise<PagedResultConveyancingModel_ | UserInputError>
export type UpdateConveyancingReturn = Promise<ConveyancingModel | UserInputError>
export type CreateUpwardLinkModelReturn = Promise<ConveyancingModel | UserInputError>
export type DeleteUpwardLinkModelReturn = Promise<String | UserInputError>
export type CreateDownwardLinkModelReturn = Promise<ConveyancingModel | UserInputError>
export type DeleteDownwardLinkModelReturn = Promise<String | UserInputError>

// resolver type
export type QueryGetConveyancingByIdReturn = AuthenticationError | GetConveyancingByIdReturn
export type QueryGetConveyancingReturn = AuthenticationError | GetConveyancingReturn
export type QueryGetConveyancingChainReturn = AuthenticationError | GetConveyancingChainReturn
export type MutationUpdateConveyancingReturn = AuthenticationError | UpdateConveyancingReturn
export type MutationCreateUpwardLinkModelReturn = AuthenticationError | CreateUpwardLinkModelReturn
export type MutationDeleteUpwardLinkModelReturn = AuthenticationError | DeleteUpwardLinkModelReturn
export type MutationCreateDownwardLinkModelReturn = AuthenticationError | CreateDownwardLinkModelReturn
export type MutationDeleteDownwardLinkModelReturn = AuthenticationError | DeleteDownwardLinkModelReturn
