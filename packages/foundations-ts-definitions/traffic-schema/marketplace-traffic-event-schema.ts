/**
 * The billing details for a given month
 */
export interface BillingBreakdownForMonthV2Model {
  /**
   * The period the billing details relate to
   */
  period?: string
  /**
   * The total cost for the given month
   */
  totalCost?: number // double
  /**
   * List of billing details for each service
   */
  services?: ServiceItemBillingV2Model[]

  /**
   * The actual cost for the given month
   */
  actualCost?: number
}
/**
 * Represents the billing summary for a given date range
 */
export interface BillingOverviewForPeriodV2Model {
  /**
   * The date the billing records are pulled from
   */
  from?: string
  /**
   * The date the billing records are pulled until
   */
  to?: string
  /**
   * Collection of monthly billing details
   */
  periods?: MonthlyBillingDetailsV2Model[]
}
/**
 * The billing details for a service
 */
export interface BillingServiceV2Model {
  /**
   * The name of the service
   */
  name?: string
  /**
   * The costs associated to the service
   */
  cost?: number // double
}
/**
 * Represents the billing details for a given month
 */
export interface MonthlyBillingDetailsV2Model {
  /**
   * The period the billing details relate to
   */
  period?: string
  /**
   * The start date the billing details relate to
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  periodStart?: string // date-time
  /**
   * The end date the billing details relate to
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  periodEnd?: string // date-time
  /**
   * The month the billing details relate to
   */
  periodName?: string
  /**
   * The gross cost for the month in GBP
   */
  cost?: number // double
  /**
   * The services to bill for
   */
  services?: BillingServiceV2Model[]
}
/**
 * Billing details for a given item in the service
 */
export interface ServiceItemBillingV2Model {
  /**
   * The name of the item
   */
  name?: string
  /**
   * The total number of requests
   */
  amount?: number // int32
  /**
   * The total cost for the endpoint
   */
  cost?: number // double
  /**
   * The total number of items for the service
   */
  itemCount?: number // int32
  /**
   * List of billing items for each service
   */
  items?: ServiceItemBillingV2Model[]
}

export interface RequestByEndpointModel {
  endpoint: string
  requestCount: number
}

export interface RequestByDateModel {
  date: string
  requestCount: number
}

export interface RequestByCustomerModel {
  customerId: string
  requestCount: number
}

export interface TrafficEventsModel {
  from?: string
  to?: string
  totalRequestCount?: number
  totalEndpointCount?: number
  requestsByEndpoint?: RequestByEndpointModel[]
  requestsByDate?: RequestByDateModel[]
  requestsByCustomer?: RequestByCustomerModel[]
  applicationId?: string[]
  customerId?: string[]
  dateFrom?: string
  dateTo?: string
}

export interface MonthlyBillingDetailsModel {
  period: string
  periodStart?: string
  periodEnd?: string
  periodName?: string
  requestCount?: number
  endpointCount?: number
  netAmount?: number
  grossAmount?: number
  vatAmount?: number
}

export interface BillingSummaryModel {
  from?: string
  to?: string
  requestsByPeriod?: MonthlyBillingDetailsModel[]
}
