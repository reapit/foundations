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
