import { fetcher } from '@reapit/utils-common'
import { logger } from '@reapit/utils-react'
import { genPaymentsHeaders } from '../utils/headers'
import { ClientConfigModel, CreateTransactionModel, MerchantKey, Transaction } from '@reapit/payments-ui'

export const OPAYO_API_URL = 'https://pi-test.sagepay.com/api/v1'

export const URLS = {
  TRANSACTIONS: '/transactions',
  MERCHANT_KEY_API: '/merchant-session-keys',
}

export const opayoCreateTransactionService = async (
  config: ClientConfigModel,
  transaction: CreateTransactionModel,
  errorSnack: (message: string) => void,
): Promise<Transaction | undefined> => {
  try {
    const response: Transaction | undefined = await fetcher({
      api: OPAYO_API_URL,
      url: `${URLS.TRANSACTIONS}`,
      method: 'POST',
      headers: genPaymentsHeaders(config),
      body: transaction,
    })

    if (response) {
      return response
    }

    throw new Error('No transaction processed')
  } catch (err) {
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}

export const opayoMerchantKeyService = async (
  config: ClientConfigModel,
  errorSnack: (message: string) => void,
): Promise<MerchantKey | undefined> => {
  try {
    const { vendorName } = config
    const response: MerchantKey | undefined = await fetcher({
      api: OPAYO_API_URL,
      url: `${URLS.MERCHANT_KEY_API}`,
      method: 'POST',
      headers: genPaymentsHeaders(config),
      body: { vendorName },
    })

    if (response) {
      return response
    }

    throw new Error('No merchant key returned')
  } catch (err) {
    const error = err as Error
    logger(error)
    errorSnack(error.message)
  }
}
