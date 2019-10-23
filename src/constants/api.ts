import { StringMap } from '../types/core'

export const MARKETPLACE_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: process.env.MARKETPLACE_API_KEY // To be replaced with getAccessToken() in fetcher
} as StringMap

export const PLATFORM_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: process.env.PLATFORM_API_KEY
} as StringMap

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json'
} as StringMap

export const REAPIT_API_BASE_URL = 'https://reapit.cloud.tyk.io'
export const COGNITO_API_BASE_URL = 'https://1wke0xp728.execute-api.eu-west-2.amazonaws.com/dev/api'
export const UPLOAD_FILE_BASE_URL = 'https://1qdnvftct6.execute-api.eu-west-2.amazonaws.com/dev/fileupload'
export const SWAGGER_BASE_URL = 'https://6qngr3ic46.execute-api.eu-west-2.amazonaws.com'

export const URLS = {
  developerCreate: '/marketplace/developers',
  apps: '/marketplace/apps',
  approvals: '/marketplace/approvals',
  swagger: '/prod/swaggerdocs',
  installations: '/marketplace/installations',
  scopes: '/marketplace/scopes'
}
