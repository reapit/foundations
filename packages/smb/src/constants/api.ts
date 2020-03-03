import { StringMap } from '@/types/core'
import { COOKIE_SESSION_KEY as COGNITIO_COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

export const CONTACTS_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const API_VERSION = '2020-02-13'

export const COOKIE_SESSION_KEY = `${COGNITIO_COOKIE_SESSION_KEY}-app-name`

export const URLS = {}
