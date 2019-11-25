import { StringMap } from '../types/core'

export const MARKETPLACE_HEADERS = {
  'Content-Type': 'application/json',
  'X-Api-Key': process.env.MARKETPLACE_API_KEY_DEV
} as StringMap

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json'
} as StringMap

export const REAPIT_API_BASE_URL = 'https://dev.platformmarketplace.reapit.net'
export const COGNITO_API_BASE_URL = 'https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api'
export const UPLOAD_FILE_BASE_URL = 'https://8k6q3p3c9a.execute-api.eu-west-2.amazonaws.com/dev/fileupload'
export const SWAGGER_BASE_URL = 'https://6qngr3ic46.execute-api.eu-west-2.amazonaws.com'

export const URLS = {
  developers: '/developers',
  apps: '/apps',
  approvals: '/approvals',
  swagger: '/prod/swaggerdocs',
  installations: '/installations',
  scopes: '/scopes',
  categories: '/categories'
}
