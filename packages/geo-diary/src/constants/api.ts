import { StringMap } from '@/types/core'

export const APPOINTMENTS_HEADERS = {
  'Content-Type': 'application/json'
} as StringMap

export const URLS = {
  appointments: '/appointments',
  offices: '/offices',
  negotiators: '/negotiators',
  properties: '/properties',
  appointmentTypes: '/configuration/appointmentTypes'
}
