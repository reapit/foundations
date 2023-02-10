import React, { FC, useState } from 'react'
import { ResendConfirmButton } from './payment-resend-confirm-button'
import { handleTransaction } from './payment-handlers'
import {
  Button,
  ButtonGroup,
  ElIcon,
  elMb7,
  FormLayout,
  Input,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  PersistentNotification,
  Select,
  Subtitle,
} from '@reapit/elements'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatCardExpires, formatCardNumber, getCardType } from './payment-card-helpers'
import { FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'
import { COUNTRY_OPTIONS } from './payment-card-country-options'
import { paymentValidationSchema } from './payment-validation-schema'
import { PaymentProvider } from '../payment-provider'

export interface PaymentFormProps {
  paymentProvider: PaymentProvider
}

export interface CardDetails {
  customerFirstName: string
  customerLastName: string
  address1: string
  city: string
  postalCode: string
  country: string
  cardholderName: string
  cardNumber: string
  expiryDate: string
  securityCode: string
  cardIdentifier: string
  email: string
}

export type PaymentStatusType = 'pending' | 'rejected' | 'posted' | 'loading' | 'awaitingPosting'

export const PaymentForm: FC<PaymentFormProps> = ({ paymentProvider }) => {
  const [transactionProcessing, setTransactionProcessing] = useState<boolean>(false)
  const { payment } = paymentProvider
  const paymentStatus = payment.status
  const { forename = '', surname = '', email = '', primaryAddress } = payment?.customer ?? {}

  const address1 = primaryAddress
    ? primaryAddress.buildingName && primaryAddress.line1
      ? `${primaryAddress.buildingName} ${primaryAddress.line1}`
      : primaryAddress.buildingNumber && primaryAddress.line1
      ? `${primaryAddress.buildingNumber} ${primaryAddress.line1}`
      : primaryAddress.buildingName || primaryAddress.buildingNumber || primaryAddress.line1 || ''
    : ''

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CardDetails>({
    resolver: yupResolver(paymentValidationSchema),
    defaultValues: {
      customerFirstName: forename,
      customerLastName: surname,
      address1,
      city: primaryAddress?.line3 ?? primaryAddress?.line4 ?? '',
      postalCode: primaryAddress?.postcode ?? '',
      country: primaryAddress?.countryId ?? '',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      securityCode: '',
      cardIdentifier: '',
      email: email,
    },
  })

  const cardType = getCardType(watch().cardNumber)

  return (
    <>
      {paymentStatus === 'rejected' && (
        <PersistentNotification className={elMb7} intent="danger" isInline isExpanded isFullWidth>
          This payment has failed. Please check the details submitted are correct and try again.
        </PersistentNotification>
      )}
      {paymentStatus === 'posted' && (
        <>
          <PersistentNotification className={elMb7} intent="secondary" isInline isExpanded isFullWidth>
            This payment has been successfully submitted and confirmation of payment has been emailed to the address
            supplied. If no email was received, you can send again by clicking the button below.
          </PersistentNotification>
          <ButtonGroup className={elMb7}>
            {payment && <ResendConfirmButton paymentFormValues={getValues()} paymentProvider={paymentProvider} />}
          </ButtonGroup>
        </>
      )}
      {paymentStatus !== 'posted' && (
        <form onSubmit={handleSubmit(handleTransaction(paymentProvider, setTransactionProcessing))}>
          <Subtitle>Billing Details</Subtitle>
          <FormLayout hasMargin>
            <InputWrap>
              <InputGroup
                {...register('customerFirstName')}
                type="text"
                label="Customer First Name"
                placeholder="First name here"
              />
              {errors.customerFirstName?.message && <InputError message={errors.customerFirstName.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('customerLastName')}
                type="text"
                label="Customer Last Name"
                placeholder="Last name here"
              />
              {errors.customerLastName?.message && <InputError message={errors.customerLastName.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('email')} type="email" label="Customer Email" placeholder="Email here" />
              {errors.email?.message && <InputError message={errors.email.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('address1')}
                type="text"
                label="Address Line 1"
                placeholder="Address First Line"
              />
              {errors.address1?.message && <InputError message={errors.address1.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('city')} type="text" label="Town / City" placeholder="Town / City Name" />
              {errors.city?.message && <InputError message={errors.city.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('postalCode')} type="text" label="Post Code" placeholder="Post Code" />
              {errors.postalCode?.message && <InputError message={errors.postalCode.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup>
                <Select {...register('country')}>
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {COUNTRY_OPTIONS.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
                <Label>Status</Label>
              </InputGroup>
            </InputWrap>
          </FormLayout>
          <Subtitle>Card Details</Subtitle>
          <FormLayout hasMargin>
            <InputWrap>
              <Controller
                control={control}
                name="cardNumber"
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <Input
                      id="cardNumber"
                      onChange={(event) => onChange(formatCardNumber(event.target.value))}
                      type="text"
                      inputMode="numeric"
                      autoComplete="cardNumber"
                      placeholder="xxxx xxxx xxxx xxxx"
                      maxLength={cardType === 'amex' ? 17 : 19}
                      {...rest}
                    />
                    <ElIcon>
                      {cardType === 'visa' ? (
                        <FaCcVisa />
                      ) : cardType === 'mastercard' ? (
                        <FaCcMastercard />
                      ) : cardType === 'amex' ? (
                        <FaCcAmex />
                      ) : (
                        <FaCreditCard />
                      )}
                    </ElIcon>
                    <Label htmlFor="cardNumber">Card Number</Label>
                  </InputGroup>
                )}
              />
              {errors.cardNumber?.message && <InputError message={errors.cardNumber.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('cardholderName')}
                type="text"
                label="Card Holder Name"
                placeholder="Name as appears on the card"
              />
              {errors.cardholderName?.message && <InputError message={errors.cardholderName.message} />}
            </InputWrap>
            <InputWrap>
              <Controller
                control={control}
                name="expiryDate"
                render={({ field: { onChange, ...rest } }) => (
                  <InputGroup>
                    <Input
                      id="expiryDate"
                      onChange={(event) => onChange(formatCardExpires(event.target.value))}
                      type="text"
                      inputMode="numeric"
                      autoComplete="expiryDate"
                      placeholder="MM / YY"
                      maxLength={7}
                      {...rest}
                    />
                    <Label htmlFor="expiryDate">Card Expires</Label>
                  </InputGroup>
                )}
              />
              {errors.expiryDate?.message && <InputError message={errors.expiryDate.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('securityCode')}
                type="text"
                label="Security Code"
                placeholder="CSV on the back of card"
                maxLength={cardType === 'amex' ? 4 : 3}
              />
              {errors.securityCode?.message && <InputError message={errors.securityCode.message} />}
            </InputWrap>
          </FormLayout>
          <ButtonGroup>
            <Button intent="primary" type="submit" loading={transactionProcessing} disabled={transactionProcessing}>
              Make Payment
            </Button>
          </ButtonGroup>
        </form>
      )}
    </>
  )
}
