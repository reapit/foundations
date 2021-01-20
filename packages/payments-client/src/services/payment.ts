import { URLS } from '../constants/api'
import { fetcher } from '@reapit/elements'
import { genPaymentsUpdateStatusHeaders } from '../utils/headers'

export interface UpdateStatusBody {
  status: string
  externalReference: string
}

export interface UpdateStatusParams {
  _eTag: string
  paymentId?: string
  session?: string
  clientCode?: string
}

export const updatePaymentStatus = async (
  body: UpdateStatusBody,
  params: UpdateStatusParams,
): Promise<any | undefined> => {
  const { paymentId, clientCode, _eTag, session } = params
  try {
    const response = await fetcher({
      api: window.reapit.config.paymentApiUrl,
      url: `${URLS.PAYMENTS}/${paymentId}`,
      method: 'PATCH',
      headers: genPaymentsUpdateStatusHeaders(clientCode || '', _eTag, session || ''),
      body,
    })

    if (response) {
      return response
    }

    throw new Error('Failed to update user')
  } catch (err) {
    console.error(err)
  }
}
