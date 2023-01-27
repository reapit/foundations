import React, { Dispatch, FC, SetStateAction } from 'react'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { DATE_TIME_FORMAT, emailRegex } from '@reapit/utils-common'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { BodyText, Button, ButtonGroup, FormLayout, InputError, InputGroup, InputWrapFull } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  useReapitUpdate,
  UpdateActionNames,
  SendFunction,
  UpdateReturnTypeEnum,
  updateActions,
} from '@reapit/use-reapit-data'
import { CreateSessionRequest, PaymentEmailRequest, SessionResponse, UpdateStatusBody } from '@reapit/payments-ui'

export type PaymentRequestModalProps = {
  refreshPayments?: () => void
  closeModal: () => void
  setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>
  selectedPayment: PaymentModel | null
}

export interface PaymentEmailRequestModel {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
  sessionExpiresAt: string
  paymentId: string
  _eTag: string
}

export interface PaymentsEmailRequestForm {
  receipientEmail: string
  sessionExpiresAt: string
}

export interface PaymentsRequestSubmitParams {
  selectedPayment: PaymentModel | null
  setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>
  closeModal: () => void
  updatePayment: SendFunction<UpdateStatusBody, boolean>
  generateSession: SendFunction<CreateSessionRequest, boolean | SessionResponse>
  generatePaymentRequest: SendFunction<PaymentEmailRequest, boolean>
  refreshPayments?: () => void
  clientCode?: string | null
}

const validationSchema = object({
  receipientEmail: string().required('Required').matches(emailRegex, 'Must be a valid email address'),
  sessionExpiresAt: string().required('Required'),
})

export const handlePaymentRequestSubmit =
  ({
    selectedPayment,
    setSelectedPayment,
    closeModal,
    updatePayment,
    generateSession,
    generatePaymentRequest,
    refreshPayments,
    clientCode,
  }: PaymentsRequestSubmitParams) =>
  async (formValues: PaymentsEmailRequestForm) => {
    const { sessionExpiresAt, receipientEmail } = formValues

    if (!sessionExpiresAt || !clientCode || !selectedPayment) return

    const formattedSessionExpires = dayjs(sessionExpiresAt).format(DATE_TIME_FORMAT.RFC3339)
    const { id, _eTag, customer, description, amount } = selectedPayment

    if (!id || !customer?.name || !description || !amount || !_eTag) return

    const sessionRes = (await generateSession({
      clientCode,
      sessionExpiresAt: formattedSessionExpires,
      paymentId: id,
    })) as SessionResponse

    if (!sessionRes) return

    const emailRequest = await generatePaymentRequest(
      {
        receipientEmail,
        recipientName: customer?.name,
        paymentReason: description,
        paymentAmount: amount,
        paymentCurrency: 'GBP',
        paymentExpiry: formattedSessionExpires,
      },
      {
        headers: {
          'reapit-session': sessionRes.id,
        },
      },
    )

    if (!emailRequest) return

    const paymentStatusUpdate = await updatePayment({
      status: 'awaitingPosting',
    })

    if (paymentStatusUpdate) {
      refreshPayments && refreshPayments()
      setSelectedPayment(null)
      closeModal()
    }
  }

export const PaymentRequestModal: FC<PaymentRequestModalProps> = ({
  refreshPayments,
  closeModal,
  setSelectedPayment,
  selectedPayment,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientCode = connectSession?.loginIdentity.clientId

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentsEmailRequestForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      receipientEmail: selectedPayment?.customer?.email ?? '',
      sessionExpiresAt: dayjs().add(1, 'week').format(DATE_TIME_FORMAT.YYYY_MM_DD),
    },
  })

  const [generateSessionLoading, , generateSession] = useReapitUpdate<CreateSessionRequest, SessionResponse>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsSessionCreate],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [generatePaymentRequestLoading, , generatePaymentRequest] = useReapitUpdate<PaymentEmailRequest, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentRequestCreate],
    method: 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
      'reapit-customer': clientCode as string,
    },
    uriParams: {
      paymentId: selectedPayment?.id,
    },
  })

  const [updatePaymentLoading, , updatePayment] = useReapitUpdate<UpdateStatusBody, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.privatePaymentUpdate],
    method: 'PATCH',
    headers: {
      'if-match': selectedPayment?._eTag as string,
    },
    uriParams: {
      paymentId: selectedPayment?.id,
    },
  })

  const isLoading = generatePaymentRequestLoading || updatePaymentLoading || generateSessionLoading

  return (
    <form
      onSubmit={handleSubmit(
        handlePaymentRequestSubmit({
          selectedPayment,
          setSelectedPayment,
          closeModal,
          updatePayment,
          generateSession,
          generatePaymentRequest,
          refreshPayments,
          clientCode,
        }),
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
            {...register('sessionExpiresAt')}
            type="date"
            label="Payment Expiry Date"
            min={dayjs().format(DATE_TIME_FORMAT.YYYY_MM_DD)}
            max={dayjs().add(1, 'month').format(DATE_TIME_FORMAT.YYYY_MM_DD)}
          />
          {errors.sessionExpiresAt?.message && <InputError message={errors.sessionExpiresAt.message} />}
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
