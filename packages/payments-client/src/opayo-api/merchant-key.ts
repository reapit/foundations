import { fetcher, notification } from '@reapit/elements'
import { logger } from '@reapit/utils'
import { URLS } from '../constants/api'
import { genPaymentsHeaders } from '../utils/headers'

export interface MerchantKey {
  merchantSessionKey: string
  expiry: string
}

export const opayoMerchantKeyService = async (clientCode: string): Promise<MerchantKey | undefined> => {
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
    logger(err)
    notification.error({
      message: 'Failed to conned to the payment provider, please try again',
      placement: 'bottomRight',
    })
  }
}
