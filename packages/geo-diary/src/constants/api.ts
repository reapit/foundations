import { StringMap } from '@/types/core'
import { COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

export const APPOINTMENTS_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const API_VERSION = '2020-01-31'

export const COOKIE_SESSION_KEY_GEO_DIARY = `${COOKIE_SESSION_KEY}-geo-diary`

export const URLS = {
  appointments: '/appointments',
  offices: '/offices',
  negotiators: '/negotiators',
  properties: '/properties',
  appointmentTypes: '/configuration/appointmentTypes',
}
