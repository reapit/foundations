import { StringMap } from '../types/core'
import { COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

export const generateHeader = (marketplaceApiKey): StringMap => ({
  'Content-Type': 'application/json',
  'X-Api-Key': marketplaceApiKey,
})

export const COOKIE_SESSION_KEY_MARKETPLACE = `${COOKIE_SESSION_KEY}-marketplace`

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const URLS = {
  developers: '/developers',
  apps: '/apps',
  approvals: '/approvals',
  installations: '/installations',
  scopes: '/scopes',
  categories: '/categories',
  docs: '/docs',
  statistics: '/statistics',
}
