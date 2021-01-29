import { fetcher } from '@reapit/elements'
import { URLS } from '../constants/api'
import { CreateTransactionModel } from '../types/opayo'
import { genPaymentsHeaders } from '../utils/headers'

interface Transaction {
  statusCode: string
  statusDetail: string
  transactionId: string
  transactionType: string
  retrievalReference: number
  bankResponseCode: string
  bankAuthorisationCode: string
  paymentMethod: PaymentMethod
  amount: Amount
  currency: string
  fiRecipient: FiRecipient
  status: string
  avsCvcCheck: AvsCvcCheck
  '3DSecure': _3DSecure
}

interface _3DSecure {
  status: string
}

interface AvsCvcCheck {
  status: string
  address: string
  postalCode: string
  securityCode: string
}

interface FiRecipient {}

interface Amount {
  totalAmount: number
  saleAmount: number
  surchargeAmount: number
}

interface PaymentMethod {
  card: Card
}

interface Card {
  cardType: string
  lastFourDigits: string
  expiryDate: string
  cardIdentifier: string
  reusable: boolean
}

export const opayoCreateTransactionService = async (
  clientCode: string,
  transaction: CreateTransactionModel,
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

    throw new Error('No merchant key returned')
  } catch (err) {
    console.error('Error fetching properties', err.message)
  }
}
