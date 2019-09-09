import { StringMap } from '../types/core'

export const PLATFORM_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: process.env.PLATFORM_API_KEY
} as StringMap

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json'
} as StringMap

export const REAPIT_API_BASE_URL = 'https://reapit.cloud.tyk.io'

export const URLS = {
  developerCreate: '/home'
}
