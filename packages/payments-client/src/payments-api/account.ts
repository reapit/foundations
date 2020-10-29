import { fetcher, StringMap } from '@reapit/elements'
// import { PaymentsAccount } from '../../../server/src/core/schema'
import { genPaymentsHeaders } from '../utils/headers'

export interface PaymentsAccountResponse {
  account: any
}

export const getAccountByCustomerCode = async (customerCode: string): Promise<any | undefined> => {
  try {
    const account: PaymentsAccountResponse | undefined = await fetcher({
      url: `/account/${customerCode}`,
      api: window.reapit.config.paymentsApiUrl,
      method: 'GET',
      headers: (await genPaymentsHeaders()) as StringMap,
    })

    if (account) {
      return account.account
    }

    throw new Error(`Account not found for ${customerCode}`)
  } catch (err) {
    console.error(err)
  }
}
