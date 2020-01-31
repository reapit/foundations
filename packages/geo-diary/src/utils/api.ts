import { getAccessToken } from '@/utils/session'
import { APPOINTMENTS_HEADERS, API_VERSION } from '@/constants/api'

export const initAuthorizedRequestHeaders = async () => ({
  ...APPOINTMENTS_HEADERS,
  Authorization: `Bearer ${await getAccessToken()}`,
  'api-version': API_VERSION,
})
