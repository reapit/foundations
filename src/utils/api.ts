import { getAccessToken } from './session'
import { CONTACTS_HEADERS } from '../constants/api'

export const initAuthorizedRequestHeaders = async () => ({
  ...CONTACTS_HEADERS,
  Authorization: `Bearer ${await getAccessToken()}`
})
