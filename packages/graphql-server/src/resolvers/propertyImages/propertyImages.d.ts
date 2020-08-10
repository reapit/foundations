import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  PropertyImageModel,
  PropertyImages,
  PagedResultPropertyImageModel_,
  CreatePropertyImageModel,
  UpdatePropertyImageModel,
} from '../../types'

export type CreatePropertyImageArgs = CreatePropertyImageModel

export type UpdatePropertyImageArgs = { id: string; _eTag: string } & UpdatePropertyImageModel

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
export type GetPropertyImagesReturn = Promise<PagedResultPropertyImageModel_ | UserInputError>
export type CreatePropertyImageReturn = Promise<PropertyImageModel | UserInputError>
export type UpdatePropertyImageReturn = Promise<PropertyImageModel | UserInputError>

// resolver type
export type QueryGetPropertyImageByIdReturn = AuthenticationError | GetPropertyImageByIdReturn
export type QueryGetPropertyImagesReturn = AuthenticationError | GetPropertyImagesReturn
export type MutationCreatePropertyImageReturn = AuthenticationError | CreatePropertyImageReturn
export type MutationUpdatePropertyImageReturn = AuthenticationError | UpdatePropertyImageReturn
