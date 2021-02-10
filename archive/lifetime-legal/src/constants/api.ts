import { StringMap } from '../types/core'
import { COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

export const CONTACTS_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const API_VERSION = '2020-01-31'

export const COOKIE_SESSION_KEY_LTL_APP = `${COOKIE_SESSION_KEY}-ltl-app`

export const URLS = {
  idChecks: '/identityChecks',
  contacts: '/contacts',
  configuration: '/configuration',
}
