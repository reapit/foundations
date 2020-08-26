import { ReapitConnectSession } from '@reapit/connect-session'
import { getNegotiators } from '../platform-api/negotiators-api'

export const getNegotiatorOfficeId = async (session: ReapitConnectSession): Promise<string> => {
  const negotiatorName = session.loginIdentity.name
  const params = new URLSearchParams()
  params.append('name', negotiatorName)
  const response = await getNegotiators(session, encodeUrl(params.toString()))
  console.log('neg response: ', response)
  return ''
}

function encodeUrl(url: string) {
  return url.split('+').join('%20')
}
