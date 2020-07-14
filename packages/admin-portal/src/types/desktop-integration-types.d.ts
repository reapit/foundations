export interface DesktopIntegrationTypeModel {
  id?: string
  name?: string
  description?: string
  url?: string
}

export interface PagedResultDesktopIntegrationTypeModel_ {
  data?: DesktopIntegrationTypeModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}
