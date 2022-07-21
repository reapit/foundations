import { fetcher } from '@reapit/utils-common'
import { logger } from '@reapit/utils-react'
import { URLS } from '../constants/api'
import { genPaymentsHeaders } from '../utils/headers'
import { CreateTransactionModel, MerchantKey, Transaction } from '../types/opayo'

export const opayoCreateTransactionService = async (
  clientCode: string,
  transaction: CreateTransactionModel,
  errorSnack: (message: string) => void,
): Promise<Transaction | undefined> => {
  try {
    const response: Transaction | undefined = await fetcher({
      api: window.reapit.config.paymentsApiUrl,
      url: `${URLS.TRANSACTIONS}`,
      method: 'POST',
      headers: genPaymentsHeaders(clientCode),
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
  clientCode: string,
  errorSnack: (message: string) => void,
): Promise<MerchantKey | undefined> => {
  try {
    const opayoKeys = window.reapit.config.opayo[clientCode]
    const response: MerchantKey | undefined = await fetcher({
      api: window.reapit.config.paymentsApiUrl,
      url: `${URLS.MERCHANT_KEY_API}`,
      method: 'POST',
      headers: genPaymentsHeaders(clientCode),
      body: { vendorName: opayoKeys.vendorName },
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
