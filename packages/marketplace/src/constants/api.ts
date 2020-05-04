import { StringMap } from '../types/core'
import { COOKIE_SESSION_KEY } from '@reapit/cognito-auth'
import { getAccessToken } from '@/utils/session'

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
  trafficEvents: '/trafficevents',
  desktopIntegrationTypes: '/DesktopIntegrationTypes',
  webhook: '/webhooks',
  webhookSubscriptions: '/webhooks/subscriptions',
  webhookTopics: '/webhooks/topics',
}

export const SANDBOX_CLIENT_ID = 'SBOX'

export const API_VERSION = '31-01-2020'

export const initAuthorizedRequestHeaders = async () => ({
  Authorization: `Bearer ${await getAccessToken()}`,
  'api-version': API_VERSION,
})
