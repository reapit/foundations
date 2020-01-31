import { StringMap } from '@/types/core'

export const APPOINTMENTS_HEADERS = {
  'Content-Type': 'application/json',
} as StringMap

export const API_VERSION = '2020-01-31'

export const URLS = {
  appointments: '/appointments',
  offices: '/offices',
  negotiators: '/negotiators',
  properties: '/properties',
  appointmentTypes: '/configuration/appointmentTypes',
}
