import { PagedApiResponse } from './core'

export type PagedSharesModel = PagedApiResponse<SharesModel>

export interface SharesModel {
  id: string
  created: string
  modified: string
  organisationId: string
  developerId: string
  datasetId: string
  datasetName: string | null
  customerId: string
  region: string
  database: string
  schema: string
  accountName: string
  accountId: string
  warehouse: string
  url: string
  dsn: string
  status: string
}
