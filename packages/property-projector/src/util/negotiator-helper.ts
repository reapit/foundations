import { ReapitConnectSession } from '@reapit/connect-session'
import { getNegotiators } from '../platform-api/negotiators-api'

export const getNegotiatorOfficeId = async (session: ReapitConnectSession): Promise<string> => {
  const negotiatorName = session.loginIdentity.name
  const params = new URLSearchParams()
  params.append('name', negotiatorName)
  const response = await getNegotiators(session, params.toString())
  console.log(response)
  return ''
}
