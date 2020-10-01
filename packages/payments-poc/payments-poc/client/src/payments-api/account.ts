import { fetcher } from '@reapit/elements'
import { PaymentsAccount } from '../../../server/src/core/schema'
import { genPaymentsHeaders } from '../utils/headers'

export interface PaymentsAccountResponse {
  account: PaymentsAccount
}

export const getAccountByCustomerCode = async (
  customerCode: string
): Promise<PaymentsAccount | undefined> => {
  try {
    const account: PaymentsAccountResponse | undefined = await fetcher({
      url: `/account/${customerCode}`,
      api: window.reapit.config.paymentsApiUrl,
      method: 'GET',
      headers: await genPaymentsHeaders(),
    })

    if (account) {
      return account.account
    }

    throw new Error(`Account not found for ${customerCode}`)
  } catch (err) {
    console.error(err)
  }
}
