import { AuthenticationError, UserInputError } from 'apollo-server'
import { PropertyModel, PagedResultPropertyModel_, CreatePropertyModel, UpdatePropertyModel } from '../../types'

export type CreatePropertyArgs = CreatePropertyModel

export type UpdatePropertyArgs = { id: string; _eTag: string } & UpdatePropertyModel

export type GetPropertyByIdArgs = {
  id: string
  embed?: string[]
}

export type GetPropertiesArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: string[]
  id?: string[]
  age?: string[]
  agentRole?: string[]
  landlordId?: string[]
  lettingStatus?: string[]
  locality?: string[]
  parking?: string[]
  sellingStatus?: string[]
  situation?: string[]
  style?: string[]
  type?: string[]
  address?: string
  departmentId?: string
  marketingMode?: string[]
  bedroomsFrom?: number
  bedroomsTo?: number
  priceFrom?: number
  priceTo?: number
  rentFrom?: number
  rentTo?: number
  rentFrequency?: number
  internetAdvertising?: boolean
}

// api return type
export type GetPropertyByIdReturn = Promise<PropertyModel | UserInputError>
export type GetPropertiesReturn = Promise<PagedResultPropertyModel_ | UserInputError>
export type CreatePropertyReturn = Promise<PropertyModel | UserInputError>
export type UpdatePropertyReturn = Promise<PropertyModel | UserInputError>

// resolver type
export type QueryGetPropertyByIdReturn = AuthenticationError | GetPropertyByIdReturn
export type QueryGetPropertiesReturn = AuthenticationError | GetPropertiesReturn
export type MutationCreatePropertyReturn = AuthenticationError | CreatePropertyReturn
export type MutationUpdatePropertyReturn = AuthenticationError | UpdatePropertyReturn
