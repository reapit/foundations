import { AuthenticationError, UserInputError } from 'apollo-server'
import { ContactModel, PagedResultContactModel_, CreateContactModel, UpdateContactModel } from '../../types'

export type CreateContactArgs = CreateContactModel

export type UpdateContactArgs = { id: string; _eTag: string } & UpdateContactModel

export type GetContactByIdArgs = {
  id: string
}

export type GetContactsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  id?: string[]
  negotiatorId?: string[]
  officeId?: string[]
  address?: string
  identityCheck?: string
  name?: string
  marketingConsent?: string
  active?: boolean
  createdFrom?: string
  createdTo?: string
}

// api return type
export type GetContactByIdReturn = Promise<ContactModel | UserInputError>
export type GetContactsReturn = Promise<PagedResultContactModel_ | UserInputError>

// temporarily return boolean, will change later
export type CreateContactReturn = Promise<boolean | UserInputError>
export type UpdateContactReturn = Promise<boolean | UserInputError>

// resolver type
export type QueryGetContactByIdReturn = AuthenticationError | GetContactByIdReturn
export type QueryGetContactsReturn = AuthenticationError | GetContactsReturn
export type MutationCreateContactReturn = AuthenticationError | CreateContactReturn
export type MutationUpdateContactReturn = AuthenticationError | UpdateContactReturn
