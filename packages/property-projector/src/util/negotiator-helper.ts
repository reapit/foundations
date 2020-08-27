import { ReapitConnectSession } from '@reapit/connect-session'
import { getNegotiators } from '../platform-api/negotiators-api'

export const getNegotiatorOfficeId = async (session: ReapitConnectSession): Promise<any> => {
  const negotiatorName = session.loginIdentity.name
  const params = new URLSearchParams()

  params.append('name', negotiatorName)

  const response = await getNegotiators(session, encodeUrl(params.toString()))
  return response?._embedded?.length ? response?._embedded[0].officeId : 'RPT'
}

function encodeUrl(url: string) {
  return url.split('+').join('%20')
}
