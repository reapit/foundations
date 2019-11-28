import { StringMap } from '@/types/core'

export const CONTACTS_HEADERS = {
  'Content-Type': 'application/json'
} as StringMap

export const REAPIT_API_BASE_URL = 'https://dev.platform.reapit.net'

export const UPLOAD_FILE_BASE_URL = 'https://8k6q3p3c9a.execute-api.eu-west-2.amazonaws.com/dev/fileupload'

export const URLS = {
  contacts: '/contacts',
  idChecks: '/identitychecks',
  configuration: '/configuration'
}
