import { PagedApiResponse } from './core'

export type PagedIpsModel = PagedApiResponse<IpsModel>

export interface IpsModel {
  id?: string
  ipAddress?: string
  cidr?: number
  created?: string
}

export type PagedRulesModel = PagedApiResponse<RulesModel>

export interface RulesModel {
  id?: string
  name?: string
  enabled: boolean
  created?: string
  modified?: string
}

export type PagedCustomersModel = PagedApiResponse<CustomersModel>

export interface CustomersModel {
  id?: string
  created?: string
  modified?: string
  organisationId?: string
  databaseId?: string
  name?: string
  status?: string
  costPerMonth?: number
  billingFrequency?: string
  warehouseSize?: string
  maxMonthlyUptime?: number
  primaryEmail?: string
  schemaVisibility?: string
  cancelled?: string
}
