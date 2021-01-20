import reapitConnectSession from '../core/connect-session'
import { ApiKey } from '../core/schema'
import axios from 'axios'
import { stringifyError } from '@reapit/node-utils'

export const getPlatformPayment = async (result: ApiKey, apiVersion: string) => {
  const accessToken = await reapitConnectSession.connectAccessToken()

  if (!accessToken) throw new Error('No access token returned from Reapit Connect')

  const payment = await axios.get(`${process.env.PLATFORM_API_BASE_URL}/payments/${result.paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'reapit-customer': result.clientCode,
      'api-version': apiVersion,
    },
  })

  if (payment.status >= 400 || !payment.data)
    throw new Error(`Payment not returned by platform: ${payment.status} ${stringifyError(payment.data)}`)

  const propertyId = payment.data.propertyId

  if (!propertyId) return payment.data

  const property = await axios.get(`${process.env.PLATFORM_API_BASE_URL}/properties/${propertyId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'reapit-customer': result.clientCode,
      'api-version': apiVersion,
    },
  })

  if (property.status >= 400 || !property.data)
    throw new Error(`Property not returned by platform: ${property.status} ${stringifyError(property.data)}`)

  return {
    ...payment.data,
    property: property.data,
  }
}
