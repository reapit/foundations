import { PagedApiResponse } from './core'

export type PagedAccountsModel = PagedApiResponse<AccountModel>

export interface AccountModel {
  id: string
  created: string
  modified: string | null
  organisationId: string
  published?: string
  username: string
  isAdmin: boolean
  status: string | null
}

export interface AccountCreateModel {
  username: string
  password: string
  email: string
  passwordConfirm?: string
  isAdmin: boolean
  devMode: boolean
  organisationId: string
  organisationName: string
}
