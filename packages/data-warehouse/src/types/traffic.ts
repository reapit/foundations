export type EndpointStatisticsModel = {
  endpoint?: string
  requestCount?: number
}

export type DateStatisticsModel = {
  date?: string
  requestCount?: number
}

export type CustomerStatisticsModel = {
  customerId?: string
  requestCount?: number
}

export type FetchTrafficStatisticsParams = {
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export type TrafficEventsStatisticsSummaryModel = {
  from?: string
  to?: string
  totalRequestCount?: number
  totalEndpointCount?: number
  requestsByEndpoint?: EndpointStatisticsModel[]
  requestsByDate?: DateStatisticsModel[]
  requestsByCustomer?: CustomerStatisticsModel[]
}
