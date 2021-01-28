import { PAYMENTS_HEADERS, URLS } from '../constants/api'
import { fetcher } from '@reapit/elements'
import { genPlatformHeaders, genPaymentsUpdateStatusHeaders } from '../utils/headers'
import { reapitConnectBrowserSession } from '../core/connect-session'

export interface UpdateStatusBody {
  status: string
  externalReference?: string
}

export interface UpdateStatusParams {
  _eTag: string
  paymentId: string
  session?: string
  clientCode?: string
}

export interface ApiKeyRequest {
  clientCode: string
  paymentId: string
  keyExpiresAt: string
}

export interface ApiKeyResponse {
  apiKey: string
}

export interface PaymentEmailRequest {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
  paymentExpiry: string
}

export const updatePaymentStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
): Promise<any | undefined> => {
  const { paymentId, _eTag } = params
  try {
    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.PAYMENTS}/${paymentId}`,
      method: 'PATCH',
      headers: {
        'if-match': _eTag,
        ...(await genPlatformHeaders()),
      },
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to update user')
  } catch (err) {
    console.error(err.message)
  }
}

export const updatePaymentSessionStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
): Promise<any | undefined> => {
  const { paymentId, clientCode, _eTag, session } = params
  if (!clientCode || !session) throw new Error('No Reapit Connect Session is present')
  try {
    const response = await fetcher({
      api: window.reapit.config.paymentApiUrl,
      url: `${URLS.PAYMENTS}/${paymentId}`,
      method: 'PATCH',
      headers: genPaymentsUpdateStatusHeaders(clientCode, _eTag, session),
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to update user')
  } catch (err) {
    console.error(err.message)
  }
}

export const generatePaymentApiKey = async (body: ApiKeyRequest): Promise<ApiKeyResponse | undefined> => {
  const session = await reapitConnectBrowserSession.connectSession()

  if (!session || !session.idToken) throw new Error('No Reapit Connect Session is present')

  try {
    const response = await fetcher({
      api: window.reapit.config.paymentApiUrl,
      url: `${URLS.GET_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session.idToken,
      },
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to generate api key')
  } catch (err) {
    console.error(err.message)
  }
}

export const generateEmailPaymentRequest = async (
  body: PaymentEmailRequest,
  params: UpdateStatusParams,
): Promise<ApiKeyResponse | undefined> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()

  const { paymentId, clientCode, session } = params

  if (!session || !connectSession || !connectSession?.idToken || !clientCode || !session)
    throw new Error('No Reapit Connect Session is present')

  try {
    const response = await fetcher({
      api: window.reapit.config.emailApiUrl,
      url: `${URLS.PAYMENT_REQUEST}/${paymentId}`,
      method: 'POST',
      headers: {
        ...PAYMENTS_HEADERS,
        'reapit-customer': clientCode,
        'x-api-key': session,
        'api-version': '2020-01-31',
        Authorization: connectSession.idToken,
      },
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to generate email payment request')
  } catch (err) {
    console.error(err.message)
  }
}
