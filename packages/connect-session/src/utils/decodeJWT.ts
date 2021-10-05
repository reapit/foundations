import * as base64 from './base64'

export const decodeJWT = (token: string): { header: any; payload: any } => {
  const parts = token.split('.')
  let header
  let payload

  if (parts.length !== 3) {
    throw new Error('Cannot decode a malformed JWT')
  }

  try {
    header = JSON.parse(base64.decodeToString(parts[0]))
    payload = JSON.parse(base64.decodeToString(parts[1]))

    return {
      header,
      payload,
    }
  } catch (e) {
    console.error(e)
    throw new Error('Token header or payload is not valid JSON')
  }
}
