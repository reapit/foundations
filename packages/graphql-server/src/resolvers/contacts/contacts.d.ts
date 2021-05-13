import { UserInputError } from 'apollo-server-lambda'
import {
  ContactModel,
  ContactModelPagedResult,
  CreateContactModel,
  UpdateContactModel,
} from '@reapit/foundations-ts-definitions'

export type CreateContactArgs = CreateContactModel

export type UpdateContactArgs = { id: string; _eTag: string } & UpdateContactModel

export type GetContactByIdArgs = {
  id: string
  embed?: ('documents' | 'identityChecks' | 'negotiators' | 'offices' | 'source')[]
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
  embed?: ('documents' | 'identityChecks' | 'negotiators' | 'offices' | 'source')[]
}

// api return type
export type GetContactByIdReturn = Promise<ContactModel | UserInputError>
export type GetContactsReturn = Promise<ContactModelPagedResult | UserInputError>
export type CreateContactReturn = Promise<ContactModel | UserInputError>
export type UpdateContactReturn = Promise<ContactModel | UserInputError>

// resolver type
export type QueryGetContactByIdReturn = GetContactByIdReturn
export type QueryGetContactsReturn = GetContactsReturn
export type MutationCreateContactReturn = CreateContactReturn
export type MutationUpdateContactReturn = UpdateContactReturn
