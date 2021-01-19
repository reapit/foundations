import reapitConnectSession from '../core/connect-session'
import { ApiKey } from '../core/schema'
import { UpdatePaymentModel } from '../types/payment'
import axios from 'axios'
import { stringifyError } from '@reapit/node-utils'

export const updatePlatformPayment = async (
  result: ApiKey,
  body: UpdatePaymentModel,
  apiVersion: string,
  eTag: string,
) => {
  const accessToken = await reapitConnectSession.connectAccessToken()

  if (!accessToken) throw new Error('No access token returned from Reapit Connect')

  const payment = await axios.patch(`${process.env.PLATFORM_API_BASE_URL}/payments/${result.paymentId}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'reapit-customer': result.clientCode,
      'api-version': apiVersion,
      'If-Match': eTag,
    },
  })

  if (payment.status === 204) {
    return true
  }

  throw new Error(`Payment not returned by platform: ${payment.status} ${stringifyError(payment.data)}`)
}
