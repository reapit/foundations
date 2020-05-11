import { StringMap } from '@/types/core'
import { COOKIE_SESSION_KEY as COGNITIO_COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

export const CONTACTS_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const API_VERSION = '2020-01-31'

export const COOKIE_SESSION_KEY = `${COGNITIO_COOKIE_SESSION_KEY}-geo-diary-v2`

export const URLS = {}
