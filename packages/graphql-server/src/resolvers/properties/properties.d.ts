import { UserInputError } from 'apollo-server-lambda'
import {
  PropertyModel,
  PropertyModelPagedResult,
  CreatePropertyModel,
  UpdatePropertyModel,
} from '@reapit/foundations-ts-definitions'

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
  officeId?: string[]
}

// api return type
export type GetPropertyByIdReturn = Promise<PropertyModel | UserInputError>
export type GetPropertiesReturn = Promise<PropertyModelPagedResult | UserInputError>
export type CreatePropertyReturn = Promise<PropertyModel | UserInputError>
export type UpdatePropertyReturn = Promise<PropertyModel | UserInputError>

// resolver type
export type QueryGetPropertyByIdReturn = GetPropertyByIdReturn
export type QueryGetPropertiesReturn = GetPropertiesReturn
export type MutationCreatePropertyReturn = CreatePropertyReturn
export type MutationUpdatePropertyReturn = UpdatePropertyReturn
