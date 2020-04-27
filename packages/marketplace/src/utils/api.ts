import { getAccessToken } from './session'
import { COGNITO_HEADERS, API_VERSION } from '../constants/api'

export const initAuthorizedRequestHeaders = async () => ({
  ...COGNITO_HEADERS,
  Authorization: `Bearer ${await getAccessToken()}`,
  'api-version': API_VERSION,
})
