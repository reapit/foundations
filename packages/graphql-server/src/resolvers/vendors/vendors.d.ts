import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import { VendorModel, PagedResultVendorModel_, UpdateVendorModel } from '../../types'

export type UpdateVendorArgs = { id: string; _eTag: string } & UpdateVendorModel

export type GetVendorByIdArgs = {
  id: string
  embed?: string[]
}

export type GetVendorsArgs = {
  pageSize: number
  pageNumber: number
  sortBy: string
  id: string[]
  embed: [string]
  negotiatorId: string[]
  officeId: string[]
  address: string
  name: string
  createdFrom: string
  createdTo: string
  lastCallFrom: string
  lastCallTo: string
  nextCallFrom: string
  nextCallTo: string
  metadata: string[]
}

// api return type
export type GetVendorByIdReturn = Promise<VendorModel | UserInputError>
export type GetVendorsReturn = Promise<PagedResultVendorModel_ | UserInputError>
export type UpdateVendorReturn = Promise<VendorModel | UserInputError>

// resolver type
export type QueryGetVendorByIdReturn = AuthenticationError | GetVendorByIdReturn
export type QueryGetVendorsReturn = AuthenticationError | GetVendorsReturn
export type MutationUpdateVendorReturn = AuthenticationError | UpdateVendorReturn
