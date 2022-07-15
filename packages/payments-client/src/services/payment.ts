import { PAYMENTS_HEADERS, URLS } from '../constants/api'
import { notification } from '@reapit/elements-legacy'
import { fetcher } from '@reapit/utils-common'
import { genPlatformHeaders, genPaymentsUpdateStatusHeaders } from '../utils/headers'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { logger } from '@reapit/utils-react'
import {
  ApiKeyRequest,
  ApiKeyResponse,
  PaymentEmailReceipt,
  PaymentEmailRequest,
  UpdateStatusBody,
  UpdateStatusParams,
} from '../types/payment'

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
    logger(err as Error)
    notification.error({
      message: 'Failed to update the status of the session with the payment provider',
    })
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
    logger(err as Error)
    notification.error({
      message: 'Failed to update the status of the session with the payment provider',
    })
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
    logger(err as Error)
    notification.error({
      message: 'Failed to connect with the payment provider please try refreshing the page',
    })
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
    logger(err as Error)
    notification.error({
      message: 'Failed to semd an email invoice, please try again',
    })
  }
}

export const generateEmailPaymentReceiptInternal = async (
  body: PaymentEmailReceipt,
  params: UpdateStatusParams,
): Promise<ApiKeyResponse | undefined> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()

  const { paymentId, clientCode } = params

  if (!connectSession || !connectSession?.idToken || !clientCode)
    throw new Error('No Reapit Connect Session is present')

  try {
    const response = await fetcher({
      api: window.reapit.config.emailApiUrl,
      url: `${URLS.PAYMENT_RECEIPT_INTERNAL}/${paymentId}`,
      method: 'POST',
      headers: {
        ...PAYMENTS_HEADERS,
        'reapit-customer': clientCode,
        'api-version': '2020-01-31',
        Authorization: connectSession.idToken,
      },
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to generate email payment receipt')
  } catch (err) {
    logger(err as Error)
    notification.error({
      message: 'Failed to send a receipt for this transaction, please try again',
    })
  }
}

export const generateEmailPaymentReceiptExternal = async (
  body: PaymentEmailReceipt,
  params: UpdateStatusParams,
): Promise<ApiKeyResponse | undefined> => {
  const { paymentId, clientCode, session } = params

  if (!session || !clientCode || !session) throw new Error('No Session is present')

  try {
    const response = await fetcher({
      api: window.reapit.config.emailApiUrl,
      url: `${URLS.PAYMENT_RECEIPT_EXTERNAL}/${paymentId}`,
      method: 'POST',
      headers: {
        ...PAYMENTS_HEADERS,
        'reapit-customer': clientCode,
        'x-api-key': session,
        'api-version': '2020-01-31',
      },
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to generate email payment receipt')
  } catch (err) {
    logger(err as Error)
    notification.error({
      message: 'Failed to send a receipt for this transaction, please try again',
    })
  }
}
