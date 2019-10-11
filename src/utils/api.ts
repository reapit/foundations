import { getAccessToken } from './session'
import { CONTACTS_HEADERS } from '../constants/api'

export const initAuthorizedRequestHeaders = async () => ({
  ...CONTACTS_HEADERS,
  Authorization: `Bearer ${await getAccessToken()}`
})

const base64Regex = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$')

export const isBase64 = base64Str => {
  const base64Value = base64Str.split(';base64,')[1]

  if (!base64Regex.test(base64Value)) {
    return false
  }

  return true
}
