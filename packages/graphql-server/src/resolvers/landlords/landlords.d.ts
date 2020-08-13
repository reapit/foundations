import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  PagedResultLandlordModel_,
  PagedResultLandlordContactRelationshipModel_,
  PagedResultLandlordModel_,
  LandlordModel,
  CreateLandlordModel,
  CreateLandlordModel,
  UpdateLandlordModel,
  LandlordContactRelationshipModel,
  CreateLandlordContactRelationshipModel,
} from '@reapit/foundations-ts-definitions'

export type GetLandlordsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: string[]
  id?: string[]
  active?: boolean
  address?: string
  name?: string
  createdFrom?: string
  createdTo?: string
  metadata?: string[]
}
export type GetLandlordByIdArgs = { id: string; embed?: string[] }
export type GetLandlordRelationshipsArgs = { id: string; pageSize?: number; pageNumber?: number }
export type GetLandlordRelationshipByIdArgs = { id: string; relationshipId: string }

export type CreateLandlordArgs = CreateLandlordModel
export type CreateLandlordRelationshipArgs = CreateLandlordContactRelationshipModel
export type UpdateLandlordArgs = { id: string; _eTag: string } & UpdateLandlordModel
export type DeleteLandlordRelationshipArgs = { id: string; relationshipId: string }

// api return type
export type GetLandlordsReturn = Promise<PagedResultLandlordModel_ | UserInputError>
export type GetLandlordByIdReturn = Promise<LandlordModel | UserInputError>
export type GetLandlordRelationshipsReturn = Promise<PagedResultLandlordContactRelationshipModel_ | UserInputError>
export type GetLandlordRelationshipByIdReturn = Promise<LandlordContactRelationshipModel | UserInputError>

export type CreateLandlordReturn = Promise<LandlordModel | UserInputError>
export type CreateLandlordRelationshipReturn = Promise<PagedResultLandlordContactRelationshipModel_ | UserInputError>
export type DeleteLandlordRelationshipReturn = Promise<boolean | UserInputError>
export type UpdateLandlordReturn = Promise<LandlordModel | UserInputError>

// resolver type
export type QueryGetLandlordsReturn = AuthenticationError | GetLandlordsReturn
export type QueryGetLandlordByIdReturn = AuthenticationError | GetLandlordByIdReturn
export type QueryGetLandlordRelationshipsReturn = AuthenticationError | GetLandlordRelationshipsReturn
export type QueryGetLandlordRelationshipByIdReturn = AuthenticationError | GetLandlordRelationshipByIdReturn

export type MutationCreateLandlordReturn = AuthenticationError | CreateLandlordReturn
export type MutationCreateLandlordRelationshipReturn = AuthenticationError | CreateLandlordRelationshipReturn
export type MutationDeleteLandlordRelationshipReturn = AuthenticationError | DeleteLandlordRelationshipReturn
export type MutationUpdateLandlordReturn = AuthenticationError | UpdateLandlordReturn
