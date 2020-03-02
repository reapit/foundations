import { AuthenticationError, UserInputError } from 'apollo-server'
import { ContactModel, PagedResultContactModel_, CreateContactModel, UpdateContactModel } from '../../types'

export type MetaData = {
  [key: string]: string
}

export type CreateContactArgs = CreateContactModel

export type UpdateContactArgs = { id: string; _eTag?: string } & UpdateContactModel

export type GetContactByIdArgs = {
  id: string
}

export type GetContactsArgs = {
  name?: string
  address?: string
  negotiatorId: string[]
  officeId: string[]
  active: boolean
  pageNumber: number
  pageSize: number
  sortBy: string
  identityCheck: string[]
  marketingConsent: string[]
}

/* return type */
export type GetContactByIdReturn = Promise<ContactModel | UserInputError>
export type GetContactsReturn = Promise<PagedResultContactModel_ | UserInputError>

/* temporarily return boolean till BE fixes the response of create contact API */
export type CreateContactReturn = Promise<boolean | UserInputError>
export type UpdateContactReturn = Promise<ContactModel | UserInputError>

/* resolver type */
export type QueryContactReturn = AuthenticationError | GetContactByIdReturn
export type QueryContactsReturn = AuthenticationError | GetContactsReturn
export type MutationCreateContactReturn = AuthenticationError | CreateContactReturn
export type MutationUpdateContactReturn = AuthenticationError | UpdateContactReturn
