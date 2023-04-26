import { StringMap } from '../types/core'

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const SANDBOX_CLIENT_ID = 'SBOX'
export const SANDBOX_CLIENT_NAME = 'Sandbox Estates SBOX'
export const SANDBOX_CLIENT = {
  status: 'Active',
  customerId: SANDBOX_CLIENT_ID,
  customerName: SANDBOX_CLIENT_NAME,
}

export const COGNITO_GROUP_DEVELOPER_EDITION = 'AgencyCloudDeveloperEdition'

export const URLS: { [s: string]: string } = {
  DEPLOYMENT_SERVICE_HOST: process.env.DEPLOYMENT_SERVICE_HOST,
}
