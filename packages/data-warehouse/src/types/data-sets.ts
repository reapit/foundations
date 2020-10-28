import { PagedApiResponse } from './core'

export type PagedDatasetsModel = PagedApiResponse<DataSetModel>

export interface DataSetModel {
  id: string
  published: string
  name: string
  provider: string
  summary: string
  description: string
  iconUrl: string | null
}
