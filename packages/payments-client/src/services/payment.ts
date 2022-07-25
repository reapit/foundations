import { PAYMENTS_HEADERS, URLS } from '../constants/api'
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
import { PaymentParams } from '../core/use-payments-state'

export const getPaymentWithProperty = async (
  paymentParams: PaymentParams,
  errorSnack: (message: string) => void,
): Promise<any | undefined> => {
  const { paymentId, clientId, session } = paymentParams

  if (!paymentId || !clientId || !session) throw new Error('Invalid client or session provided')

  try {
    const response = await fetcher({
      api: window.reapit.config.paymentApiUrl,
      url: `${URLS.PAYMENTS}/${paymentId}`,
      method: 'GET',
      headers: {
        ...PAYMENTS_HEADERS,
        'reapit-customer': clientId,
        'x-api-key': session,
        'api-version': '2020-01-31',
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch payment')
  } catch (err) {
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const updatePaymentStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
  errorSnack: (message: string) => void,
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
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const updatePaymentSessionStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
  errorSnack: (message: string) => void,
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
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const generatePaymentApiKey = async (
  body: ApiKeyRequest,
  errorSnack: (message: string) => void,
): Promise<ApiKeyResponse | undefined> => {
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
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const generateEmailPaymentRequest = async (
  body: PaymentEmailRequest,
  params: UpdateStatusParams,
  errorSnack: (message: string) => void,
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
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const generateEmailPaymentReceiptInternal = async (
  body: PaymentEmailReceipt,
  params: UpdateStatusParams,
  errorSnack: (message: string) => void,
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
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const generateEmailPaymentReceiptExternal = async (
  body: PaymentEmailReceipt,
  params: UpdateStatusParams,
  errorSnack: (message: string) => void,
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
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}
