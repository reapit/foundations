import reapitConnectSession from '../core/connect-session'
import { ApiKey } from '../core/schema'

export const getPlatformPayment = async (result: ApiKey, apiVersion: string) => {
  const accessToken = await reapitConnectSession.connectAccessToken()
  const payment = await fetch(`${process.env.PLATFORM_API_BASE_URL}/payments/${result.paymentId}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'reapit-customer': result.clientCode,
      'api-version': apiVersion,
    }),
  })

  const paymentJson = await payment.json()

  if (payment.ok) {
    return paymentJson
  }

  throw new Error(`Payment not returned by platform: ${paymentJson.description}`)
}
