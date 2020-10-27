import { PagedApiResponse } from './core'

export type PagedAccountsModel = PagedApiResponse<AccountModel>

export interface AccountModel {
  id: string
  created: string
  modified: string
  organisationId: string
  username: string
  isAdmin: boolean
}

export interface AccountCreateModel {
  username: string
  password: string
  isAdmin: boolean
  devMode: boolean
  organisationId: string
  organisationName: string
}
