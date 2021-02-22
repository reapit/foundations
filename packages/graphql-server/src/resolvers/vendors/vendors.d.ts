import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  VendorModel,
  VendorModelPagedResult,
  VendorContactRelationshipModelPagedResult,
  UpdateVendorModel,
  VendorContactRelationshipModel,
} from '@reapit/foundations-ts-definitions'

export type UpdateVendorArgs = { id: string; _eTag: string } & UpdateVendorModel

export type GetVendorByIdArgs = {
  id: string
  embed?: string[]
}

export type GetVendorsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  embed?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  address?: string
  name?: string
  createdFrom?: string
  createdTo?: string
  lastCallFrom?: string
  lastCallTo?: string
  nextCallFrom?: string
  nextCallTo?: string
  metadata?: string[]
}

export type GetVendorRelationshipsArgs = {
  id: string
  pageSize?: number
  pageNumber?: number
}

export type GetVendorRelationshipByIdArgs = {
  id: string
  relationshipId: string
}

export type DeleteVendorRelationshipArgs = {
  id: string
  relationshipId: string
}

export type CreateVendorRelationshipArgs = {
  id: string
  associatedId: string
  associatedType: string
  isMain: boolean
}

// api return type
export type GetVendorByIdReturn = Promise<VendorModel | UserInputError>
export type GetVendorsReturn = Promise<VendorModelPagedResult | UserInputError>
export type UpdateVendorReturn = Promise<VendorModel | UserInputError>
export type GetVendorRelationshipByIdReturn = Promise<VendorContactRelationshipModel | UserInputError>
export type GetVendorRelationshipsReturn = Promise<VendorContactRelationshipModelPagedResult | UserInputError>
export type CreateVendorRelationshipReturn = Promise<boolean | UserInputError>
export type DeleteVendorRelationshipReturn = Promise<boolean | UserInputError>

// resolver type
export type QueryGetVendorByIdReturn = AuthenticationError | GetVendorByIdReturn
export type QueryGetVendorsReturn = AuthenticationError | GetVendorsReturn
export type QueryGetVendorRelationshipByIdReturn = AuthenticationError | GetVendorRelationshipByIdReturn
export type QueryGetVendorRelationshipsReturn = AuthenticationError | GetVendorRelationshipsReturn

export type MutationUpdateVendorReturn = AuthenticationError | UpdateVendorReturn
export type MutationCreateVendorRelationshipReturn = AuthenticationError | CreateVendorRelationshipReturn
export type MutationDeleteVendorRelationshipReturn = AuthenticationError | DeleteVendorRelationshipReturn
