import { fetcher, StringMap } from '@reapit/elements'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { genPaymentsHeaders, genPaymentsHeadersSession } from '../utils/headers'

export interface MerchantKey {
  merchantSessionKey: string
  expiry: string
}

export const opayoMerchantKeyService = async (): Promise<MerchantKey | undefined> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) throw new Error('User is not logged in')
  const opayoKeys = window.reapit.config.opayo[connectSession.loginIdentity.clientId as string]
  try {
    const response: MerchantKey | undefined = await fetcher({
      api: window.reapit.config.paymentsApiUrl,
      url: `${URLS.MERCHANT_KEY_API}`,
      method: 'POST',
      headers: (await genPaymentsHeaders()) as StringMap,
      body: { vendorName: opayoKeys.vendorName },
    })

    if (response) {
      return response
    }

    throw new Error('No merchant key returned')
  } catch (err) {
    console.error('Error fetching properties', err.message)
  }
}

export const opayoSessionMerchantKeyService = async (): Promise<MerchantKey | undefined> => {
  const opayoKeys = window.reapit.config.opayo.SBOX
  try {
    const response: MerchantKey | undefined = await fetcher({
      api: window.reapit.config.paymentsApiUrl,
      url: `${URLS.MERCHANT_KEY_API}`,
      method: 'POST',
      headers: (await genPaymentsHeadersSession()) as StringMap,
      body: { vendorName: opayoKeys.vendorName },
    })

    if (response) {
      return response
    }

    throw new Error('No merchant key returned')
  } catch (err) {
    console.error('Error fetching properties', err.message)
  }
}
