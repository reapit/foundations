import { getAccessToken } from '@/utils/session'
import { APPOINTMENTS_HEADERS } from '@/constants/api'

export const initAuthorizedRequestHeaders = async () => ({
  ...APPOINTMENTS_HEADERS,
  Authorization: `Bearer ${await getAccessToken()}`,
})
