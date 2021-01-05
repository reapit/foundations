import reapitConnectSession from '../core/connect-session'
import { ApiKey } from '../core/schema'
import { UpdatePaymentModel } from '../types/payment'

export const updatePlatformPayment = async (
  result: ApiKey,
  body: UpdatePaymentModel,
  apiVersion: string,
  eTag: string,
) => {
  const accessToken = await reapitConnectSession.connectAccessToken()
  const payment = await fetch(`${process.env.PLATFORM_API_BASE_URL}/payments/${result.paymentId}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${accessToken}`,
      'reapit-customer': result.clientCode,
      'api-version': apiVersion,
      'If-Match': eTag,
    }),
    body: JSON.stringify(body),
  })

  if (payment.ok) {
    return true
  }

  throw new Error(`Payment not returned by platform: ${payment.status} ${payment.statusText}`)
}
