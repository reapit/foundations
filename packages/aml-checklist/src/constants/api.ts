import { StringMap } from '@/types/core'

export const CONTACTS_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const API_VERSION = '2020-01-31'

export const URLS = {
  contacts: '/contacts',
  idChecks: '/identityChecks',
  configuration: '/configuration',
}
