import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  PropertyImageModel,
  PropertyImageModelPagedResult,
  CreatePropertyImageModel,
  UpdatePropertyImageModel,
} from '@reapit/foundations-ts-definitions'

export type CreatePropertyImageArgs = CreatePropertyImageModel

export type UpdatePropertyImageArgs = { id: string; _eTag: string } & UpdatePropertyImageModel

export type DeletePropertyImageArgs = { id: string }

export type GetPropertyImageByIdArgs = {
  id: string
  embed?: string[]
}

export type GetPropertyImagesArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  propertyId?: string[]
  type?: ('photograph' | 'map' | 'floorPlan' | 'epc')[]
}

// api return type
export type GetPropertyImageByIdReturn = Promise<PropertyImageModel | UserInputError>
export type GetPropertyImagesReturn = Promise<PropertyImageModelPagedResult | UserInputError>
export type CreatePropertyImageReturn = Promise<PropertyImageModel | UserInputError>
export type UpdatePropertyImageReturn = Promise<PropertyImageModel | UserInputError>
export type DeletePropertyImageReturn = Promise<boolean | UserInputError>

// resolver type
export type QueryGetPropertyImageByIdReturn = AuthenticationError | GetPropertyImageByIdReturn
export type QueryGetPropertyImagesReturn = AuthenticationError | GetPropertyImagesReturn
export type MutationCreatePropertyImageReturn = AuthenticationError | CreatePropertyImageReturn
export type MutationUpdatePropertyImageReturn = AuthenticationError | UpdatePropertyImageReturn
export type MutationDeletePropertyImageReturn = AuthenticationError | DeletePropertyImageReturn
