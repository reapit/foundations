import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { DATE_TIME_FORMAT, emailRegex } from '@reapit/utils-common'
import { usePaymentsState } from '../../../core/use-payments-state'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  BodyText,
  Button,
  ButtonGroup,
  FormLayout,
  InputError,
  InputGroup,
  InputWrapFull,
  useSnack,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { generateEmailPaymentRequest, generatePaymentApiKey, updatePaymentStatus } from '../../../services/payment'

export type PaymentRequestModalProps = {
  refreshPayments?: () => void
  closeModal: () => void
}

export interface PaymentEmailRequestModel {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
  keyExpiresAt: string
  paymentId: string
  _eTag: string
}

export interface PaymentsEmailRequestForm {
  receipientEmail: string
  keyExpiresAt: string
}

const validationSchema = object({
  receipientEmail: string().required('Required').matches(emailRegex, 'Must be a valid email address'),
  keyExpiresAt: string().required('Required'),
})

export const handlePaymentRequestSubmit =
  (
    selectedPayment: PaymentModel | null,
    setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>,
    closeModal: () => void,
    setLoading: Dispatch<SetStateAction<boolean>>,
    errorSnack: (message: string) => void,
    refreshPayments?: () => void,
    clientCode?: string | null,
  ) =>
  async (formValues: PaymentsEmailRequestForm) => {
    const { keyExpiresAt, receipientEmail } = formValues

    if (!keyExpiresAt || !clientCode || !selectedPayment) return

    const formattedKeyExpires = dayjs(keyExpiresAt).format(DATE_TIME_FORMAT.RFC3339)
    const { id, _eTag, customer, description, amount } = selectedPayment

    if (!id || !customer?.name || !description || !amount || !_eTag) return

    setLoading(true)

    const apiKeyRes = await generatePaymentApiKey(
      {
        clientCode,
        keyExpiresAt: formattedKeyExpires,
        paymentId: id,
      },
      errorSnack,
    )

    if (!apiKeyRes) {
      setLoading(false)
      return
    }

    const updateParams = { paymentId: id, clientCode, _eTag, session: apiKeyRes.apiKey }

    const emailRequest = await generateEmailPaymentRequest(
      {
        receipientEmail,
        recipientName: customer?.name,
        paymentReason: description,
        paymentAmount: amount,
        paymentCurrency: 'GBP',
        paymentExpiry: formattedKeyExpires,
      },
      updateParams,
      errorSnack,
    )

    if (!emailRequest) {
      setLoading(false)
      return
    }

    const paymentStatusUpdate = await updatePaymentStatus(
      {
        status: 'awaitingPosting',
      },
      updateParams,
      errorSnack,
    )

    if (paymentStatusUpdate) {
      refreshPayments && refreshPayments()
      setSelectedPayment(null)
      closeModal()
      setLoading(false)
    }
  }

export const PaymentRequestModal: FC<PaymentRequestModalProps> = ({ refreshPayments, closeModal }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { paymentsDataState } = usePaymentsState()
  const { error } = useSnack()
  const clientId = connectSession?.loginIdentity.clientId
  const { setSelectedPayment, selectedPayment } = paymentsDataState

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentsEmailRequestForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      receipientEmail: selectedPayment?.customer?.email ?? '',
      keyExpiresAt: dayjs().add(1, 'week').format(DATE_TIME_FORMAT.YYYY_MM_DD),
    },
  })

  return (
    <form
      onSubmit={handleSubmit(
        handlePaymentRequestSubmit(
          selectedPayment,
          setSelectedPayment,
          closeModal,
          setLoading,
          error,
          refreshPayments,
          clientId,
        ),
      )}
    >
      <BodyText hasGreyText>
        The below form will send an email request for payment to your customer with an embedded link to our card
        processing page. You should set an expiry for this payment request and an email address to receive the request.
        The default expiry is a week.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup {...register('receipientEmail')} type="email" label="Receipient Email" />
          {errors.receipientEmail?.message && <InputError message={errors.receipientEmail.message} />}
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            {...register('keyExpiresAt')}
            type="date"
            label="Payment Expiry Date"
            min={dayjs().format(DATE_TIME_FORMAT.YYYY_MM_DD)}
            max={dayjs().add(1, 'month').format(DATE_TIME_FORMAT.YYYY_MM_DD)}
          />
          {errors.keyExpiresAt?.message && <InputError message={errors.keyExpiresAt.message} />}
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="center">
        <Button intent="low" onClick={closeModal} type="button" disabled={isLoading}>
          Cancel
        </Button>
        <Button intent="primary" type="submit" disabled={isLoading} loading={isLoading}>
          Send Payment Request
        </Button>
      </ButtonGroup>
    </form>
  )
}

export default PaymentRequestModal
