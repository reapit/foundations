import { UserInputError } from 'apollo-server-lambda'
import {
  LandlordModelPagedResult,
  LandlordContactRelationshipModelPagedResult,
  LandlordModel,
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
export type CreateLandlordRelationshipArgs = CreateLandlordContactRelationshipModel & { id: string; isMain?: boolean }
export type UpdateLandlordArgs = { id: string; _eTag: string } & UpdateLandlordModel
export type DeleteLandlordRelationshipArgs = { id: string; relationshipId: string }

// api return type
export type GetLandlordsReturn = Promise<LandlordModelPagedResult | UserInputError>
export type GetLandlordByIdReturn = Promise<LandlordModel | UserInputError>
export type GetLandlordRelationshipsReturn = Promise<LandlordContactRelationshipModelPagedResult | UserInputError>
export type GetLandlordRelationshipByIdReturn = Promise<LandlordContactRelationshipModel | UserInputError>

export type CreateLandlordReturn = Promise<LandlordModel | UserInputError>
export type CreateLandlordRelationshipReturn = Promise<LandlordContactRelationshipModelPagedResult | UserInputError>
export type DeleteLandlordRelationshipReturn = Promise<string | UserInputError>
export type UpdateLandlordReturn = Promise<LandlordModel | UserInputError>

// resolver type
export type QueryGetLandlordsReturn = GetLandlordsReturn
export type QueryGetLandlordByIdReturn = GetLandlordByIdReturn
export type QueryGetLandlordRelationshipsReturn = GetLandlordRelationshipsReturn
export type QueryGetLandlordRelationshipByIdReturn = GetLandlordRelationshipByIdReturn

export type MutationCreateLandlordReturn = CreateLandlordReturn
export type MutationCreateLandlordRelationshipReturn = CreateLandlordRelationshipReturn
export type MutationDeleteLandlordRelationshipReturn = DeleteLandlordRelationshipReturn
export type MutationUpdateLandlordReturn = UpdateLandlordReturn
