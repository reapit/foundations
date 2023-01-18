import { URLS } from '../constants/api'
import { fetcher } from '@reapit/utils-common'
import { genPlatformHeaders } from '../utils/headers'
import { logger } from '@reapit/utils-react'
import {
  ApiKeyRequest,
  ApiKeyResponse,
  PaymentEmailRequest,
  UpdateStatusBody,
  UpdateStatusParams,
} from '@reapit/payments-ui'

export const updatePaymentStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
  errorSnack: (message: string) => void,
): Promise<any | undefined> => {
  const { paymentId, _eTag } = params
  const headers = await genPlatformHeaders()
  try {
    const response = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.PAYMENTS}/${paymentId}`,
      method: 'PATCH',
      headers: {
        'if-match': _eTag,
        ...headers,
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

export const generatePaymentApiKey = async (
  body: ApiKeyRequest,
  errorSnack: (message: string) => void,
): Promise<ApiKeyResponse | undefined> => {
  const headers = await genPlatformHeaders()

  try {
    const response = await fetcher({
      api: window.reapit.config.paymentsApiUrl,
      url: `${URLS.SESSION}`,
      method: 'POST',
      headers,
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
  const { paymentId } = params

  const headers = await genPlatformHeaders()

  try {
    const response = await fetcher({
      api: window.reapit.config.paymentsApiUrl,
      url: `${URLS.PAYMENT_REQUEST}/${paymentId}`,
      method: 'POST',
      headers,
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

// export const generateEmailPaymentReceipt = async (
//   body: PaymentEmailReceipt,
//   params: UpdateStatusParams,
//   errorSnack: (message: string) => void,
// ): Promise<ApiKeyResponse | undefined> => {
//   const { paymentId } = params

//   const headers = await genPlatformHeaders()

//   try {
//     const response = await fetcher({
//       api: window.reapit.config.paymentsApiUrl,
//       url: `${URLS.PAYMENT_RECEIPT}/${paymentId}`,
//       method: 'POST',
//       headers,
//       body,
//     })

//     if (response) {
//       return response
//     }

//     throw new Error('Failed to generate email payment receipt')
//   } catch (err) {
//     const error = err as Error
//     logger(error)
//     errorSnack(error.message)
//   }
// }
