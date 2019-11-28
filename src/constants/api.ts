import { StringMap } from '@/types/core'

export const APPOINTMENTS_HEADERS = {
  'Content-Type': 'application/json'
} as StringMap

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'

export const URLS = {
  appointments: '/appointments',
  appointmentTypes: '/configuration/appointmentTypes'
}
