import { StringMap } from '../types/core'
import { COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

export const COOKIE_SESSION_KEY_MARKETPLACE = `${COOKIE_SESSION_KEY}-marketplace`

export const COGNITO_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const SANDBOX_CLIENT_ID = 'SBOX'
