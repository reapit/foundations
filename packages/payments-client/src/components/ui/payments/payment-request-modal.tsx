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
  LevelRight,
  Formik,
} from '@reapit/elements'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import * as Yup from 'yup'
import { handlePaymentRequestSubmit } from './payment-handlers'
import { emailRegex } from '@reapit/utils'

export type PaymentRequestModalProps = {
  payment: PaymentModel | null
  setSelectedPayment: React.Dispatch<React.SetStateAction<PaymentModel | null>>
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

export const PaymentRequestModal: React.FC<PaymentRequestModalProps> = ({ payment, setSelectedPayment }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleOnClose = () => setSelectedPayment(null)
  return (
    <ModalV2
      visible={Boolean(payment)}
      destroyOnClose={true}
      onClose={handleOnClose}
      title={`Request Payment of £${payment?.amount?.toFixed(2)} for ${payment?.id}`}
    >
      <Formik
        initialValues={
          {
            receipientEmail: payment?.customer?.email ?? '',
            recipientName: payment?.customer?.name ?? 'Name Unknown',
            paymentReason: payment?.description ?? 'No Reason Provided',
            paymentAmount: payment?.amount,
            paymentCurrency: 'GBP',
            keyExpiresAt: new Date(),
            paymentId: payment?.id as string,
            _eTag: payment?._eTag as string,
          } as PaymentEmailRequestModel
        }
        onSubmit={handlePaymentRequestSubmit(setIsLoading, setSelectedPayment)}
        validationSchema={Yup.object({
          receipientEmail: Yup.string()
            .required('Required')
            .matches(emailRegex, 'Must be a valid email address'),
          keyExpiresAt: Yup.string().required('Required'),
        })}
      >
        <Form className="form">
          <FormSection>
            <FormHeading>Send request for payment</FormHeading>
            <FormSubHeading>
              The below form will send an email request for payment to your customer with an embedded link to our card
              processing page. You should set an expiry for this payment request and an email address to receive the
              request.
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
                minDate: new Date(),
              }}
            />
            <LevelRight>
              <Button variant="info" onClick={handleOnClose} type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading}>
                Send Payment Request
              </Button>
            </LevelRight>
          </FormSection>
        </Form>
      </Formik>
    </ModalV2>
  )
}

export default PaymentRequestModal
