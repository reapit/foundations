import React, { useState } from 'react'
import {
  Button,
  ModalV2,
  Form,
  FormSection,
  FormSubHeading,
  FormHeading,
  Input,
  DatePicker,
  ButtonGroup,
  Formik,
} from '@reapit/elements'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import * as Yup from 'yup'
import { handlePaymentRequestSubmit } from './payment-handlers'
import { emailRegex } from '@reapit/utils'

export type PaymentRequestModalProps = {
  payment: PaymentModel | null
  setSelectedPayment: React.Dispatch<React.SetStateAction<PaymentModel | null>>
  refetchPayments: () => void
}

export interface PaymentEmailRequestModel {
  receipientEmail: string
  recipientName: string
  paymentReason: string
  paymentAmount: number
  paymentCurrency: string
  keyExpiresAt: Date
  paymentId: string
  _eTag: string
}

export const PaymentRequestModal: React.FC<PaymentRequestModalProps> = ({
  payment,
  setSelectedPayment,
  refetchPayments,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleOnClose = () => {
    setSelectedPayment(null)
    refetchPayments()
  }
  return (
    <ModalV2
      visible={Boolean(payment)}
      destroyOnClose={true}
      isCentered
      onClose={handleOnClose}
      title={`Request Payment of £${payment?.amount ? payment?.amount.toFixed(2) : 0} for ${payment?.id}`}
    >
      <Formik
        initialValues={
          {
            receipientEmail: payment?.customer?.email ?? '',
            recipientName: payment?.customer?.name ?? 'Name Unknown',
            paymentReason: payment?.description ?? 'No Reason Provided',
            paymentAmount: payment?.amount,
            paymentCurrency: 'GBP',
            // default to one week from now
            keyExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            paymentId: payment?.id as string,
            _eTag: payment?._eTag as string,
          } as PaymentEmailRequestModel
        }
        onSubmit={handlePaymentRequestSubmit(setIsLoading, handleOnClose)}
        validationSchema={Yup.object({
          receipientEmail: Yup.string().required('Required').matches(emailRegex, 'Must be a valid email address'),
          keyExpiresAt: Yup.string().required('Required'),
        })}
      >
        <Form className="form">
          <FormSection>
            <FormHeading>Send request for payment</FormHeading>
            <FormSubHeading>
              The below form will send an email request for payment to your customer with an embedded link to our card
              processing page. You should set an expiry for this payment request and an email address to receive the
              request. The default expiry is a week.
            </FormSubHeading>
            <Input
              id="receipientEmail"
              type="text"
              placeholder="email@example.com"
              name="receipientEmail"
              labelText="Recpient Email Address"
            />
            <DatePicker
              name="keyExpiresAt"
              labelText="Payment Request Expiry"
              id="keyExpiresAt"
              reactDatePickerProps={{
                // earliest expiry is 24hrs from now
                minDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
              }}
            />
            <ButtonGroup hasSpacing isCentered>
              <Button variant="secondary" onClick={handleOnClose} type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading}>
                Send Payment Request
              </Button>
            </ButtonGroup>
          </FormSection>
        </Form>
      </Formik>
    </ModalV2>
  )
}

export default PaymentRequestModal
