import { Dispatch, SetStateAction } from 'react'
import { DATE_TIME_FORMAT, notification } from '@reapit/elements'
import { MerchantKey, opayoMerchantKeyService } from '../../../opayo-api/merchant-key'
import { PaymentEmailRequestModel } from './payment-request-modal'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { generateEmailPaymentRequest, generatePaymentApiKey, updatePaymentStatus } from '../../../services/payment'
import dayjs from 'dayjs'

export const handleMerchantKeyEffect = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setMerchantKey: Dispatch<SetStateAction<MerchantKey | null>>,
  clientCode?: string | null,
) => () => {
  if (clientCode) {
    const fetchmerchantKey = async () => {
      const fetchedKey = await opayoMerchantKeyService(clientCode)
      if (fetchedKey) {
        setMerchantKey(fetchedKey)
      }
      setLoading(false)
    }

    fetchmerchantKey()

    setLoading(true)
  }
}

export const handlePaymentRequestSubmit = (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  handleOnClose: () => void,
) => async ({
  receipientEmail,
  recipientName,
  paymentReason,
  paymentAmount,
  paymentCurrency,
  keyExpiresAt,
  paymentId,
  _eTag,
}: PaymentEmailRequestModel) => {
  try {
    setIsLoading(true)
    const session = await reapitConnectBrowserSession.connectSession()
    if (!session || !session.loginIdentity.clientId) throw new Error('No Reapit Connect Session is present')

    const formattedKeyExpires = dayjs(keyExpiresAt).format(DATE_TIME_FORMAT.RFC3339)

    const apiKey = await generatePaymentApiKey({
      clientCode: session.loginIdentity.clientId,
      keyExpiresAt: formattedKeyExpires,
      paymentId,
    })

    if (!apiKey) throw new Error('API key request failed')

    const updateParams = { paymentId, clientCode: session.loginIdentity.clientId, _eTag, session: apiKey.apiKey }

    const emailRequest = await generateEmailPaymentRequest(
      {
        receipientEmail,
        recipientName,
        paymentReason,
        paymentAmount,
        paymentCurrency,
        paymentExpiry: formattedKeyExpires,
      },
      updateParams,
    )

    if (!emailRequest) throw new Error('Email request failed')

    const paymentStatusUpdate = await updatePaymentStatus(
      {
        status: 'awaitingPosting',
      },
      updateParams,
    )

    if (!paymentStatusUpdate) throw new Error('Payment status update request failed')

    notification.success({
      message: 'Payment request was successfully sent by email',
    })
    setIsLoading(false)
    handleOnClose()
  } catch (err) {
    notification.error({
      message: 'Payment email request was unsuccessful',
    })
  }
}
