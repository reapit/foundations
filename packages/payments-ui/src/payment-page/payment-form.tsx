import React, { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { ResendConfirmButton } from './payment-resend-confirm-button'
import { handleTransaction, onUpdateStatus } from './payment-handlers'
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
  useModal,
} from '@reapit/elements'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatCardExpires, formatCardNumber, getCardType } from './payment-card-helpers'
import { FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'
import { COUNTRY_OPTIONS } from './payment-card-country-options'
import { paymentValidationSchema } from './payment-validation-schema'
import { PaymentProvider } from '../payment-provider'
import { ThreeDSecureResponse } from '../types/opayo'
import { ClientConfigModel } from '../types/config'
import { frameContent } from './frame-content'

export interface PaymentFormProps {
  paymentProvider: PaymentProvider
}

export interface CachedTransaction {
  transaction: ThreeDSecureResponse
  cardDetails: CardDetails
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

export const handleMessage =
  (setThreeDSecureMessage: Dispatch<SetStateAction<string | null>>) => (event: MessageEvent<any>) => {
    if (event.data && typeof event.data === 'string') {
      setThreeDSecureMessage(event.data)
    }
  }

export const handleSetIframeContent =
  (
    iframeRef: RefObject<HTMLIFrameElement>,
    cachedTransaction: CachedTransaction | null,
    config: ClientConfigModel,
    modalIsOpen: boolean,
    setThreeDSecureMessage: Dispatch<SetStateAction<string | null>>,
  ) =>
  () => {
    if (iframeRef.current && cachedTransaction && config && modalIsOpen) {
      const iframeDoc = iframeRef.current.contentDocument
      const { acsUrl, cReq, transactionId } = cachedTransaction.transaction ?? {}
      const threeDSSessionData = window.btoa(`${config.clientCode}:${transactionId}`)
      const frameString = frameContent(acsUrl, cReq, threeDSSessionData)

      if (iframeDoc) {
        iframeDoc.open()
        iframeDoc.write(frameString)
        iframeDoc.close()
        window.onmessage = handleMessage(setThreeDSecureMessage)
      }
    }
  }

export const handleThreeDSecureResponse =
  (
    threeDSecureMessage: string | null,
    paymentProvider: PaymentProvider,
    cachedTransaction: CachedTransaction | null,
    modalIsOpen: boolean,
    setCachedTransaction: React.Dispatch<React.SetStateAction<CachedTransaction | null>>,
    setTransactionProcessing: React.Dispatch<React.SetStateAction<boolean>>,
    closeModal: () => void,
    openModal: () => void,
  ) =>
  () => {
    const handleUpdateStatus = async (transaction: ThreeDSecureResponse, cardDetails: CardDetails) => {
      const status = threeDSecureMessage === 'success' ? 'posted' : 'rejected'
      const { transactionId } = transaction
      await onUpdateStatus(status, paymentProvider, cardDetails, setTransactionProcessing, transactionId)
    }

    if (threeDSecureMessage && modalIsOpen && cachedTransaction) {
      const { transaction, cardDetails } = cachedTransaction
      handleUpdateStatus(transaction, cardDetails)
      setCachedTransaction(null)
      closeModal()
    } else if (cachedTransaction && !modalIsOpen) {
      openModal()
    }
  }

export const PaymentForm: FC<PaymentFormProps> = ({ paymentProvider }) => {
  const [transactionProcessing, setTransactionProcessing] = useState<boolean>(false)
  const [cachedTransaction, setCachedTransaction] = useState<CachedTransaction | null>(null)
  const [threeDSecureMessage, setThreeDSecureMessage] = useState<string | null>(null)
  const { openModal, closeModal, modalIsOpen, Modal } = useModal()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { payment, config } = paymentProvider
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

  useEffect(handleSetIframeContent(iframeRef, cachedTransaction, config, modalIsOpen, setThreeDSecureMessage), [
    iframeRef,
    cachedTransaction,
    config,
    modalIsOpen,
  ])

  useEffect(
    handleThreeDSecureResponse(
      threeDSecureMessage,
      paymentProvider,
      cachedTransaction,
      modalIsOpen,
      setCachedTransaction,
      setTransactionProcessing,
      closeModal,
      openModal,
    ),
    [cachedTransaction, threeDSecureMessage, modalIsOpen],
  )

  return (
    <>
      {threeDSecureMessage === 'failure' && (
        <PersistentNotification className={elMb7} intent="danger" isInline isExpanded isFullWidth>
          Your bank has rejected the 3D Secure transaction. Please check your credentials and try again.
        </PersistentNotification>
      )}
      {paymentStatus === 'rejected' && (
        <PersistentNotification className={elMb7} intent="danger" isInline isExpanded isFullWidth>
          This payment has failed. Please check the details submitted are correct and try again.
        </PersistentNotification>
      )}
      {paymentStatus === 'posted' && (
        <>
          <PersistentNotification className={elMb7} intent="success" isInline isExpanded isFullWidth>
            This payment has been successfully submitted and confirmation of payment has been emailed to the address
            supplied. If no email was received, you can send again by clicking the button below.
          </PersistentNotification>
          {payment && <ResendConfirmButton paymentFormValues={getValues()} paymentProvider={paymentProvider} />}
        </>
      )}

      <Modal title="3D Secure Check Required">
        <iframe ref={iframeRef} width="100%" height="300px" />
      </Modal>
      {paymentStatus !== 'posted' && (
        <form
          onSubmit={handleSubmit(handleTransaction(paymentProvider, setTransactionProcessing, setCachedTransaction))}
        >
          <Subtitle>Billing Details</Subtitle>
          <FormLayout hasMargin>
            <InputWrap>
              <InputGroup
                {...register('customerFirstName')}
                disabled={Boolean(cachedTransaction)}
                type="text"
                label="Customer First Name"
                placeholder="First name here"
              />
              {errors.customerFirstName?.message && <InputError message={errors.customerFirstName.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('customerLastName')}
                disabled={Boolean(cachedTransaction)}
                type="text"
                label="Customer Last Name"
                placeholder="Last name here"
              />
              {errors.customerLastName?.message && <InputError message={errors.customerLastName.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('email')}
                disabled={Boolean(cachedTransaction)}
                type="email"
                label="Customer Email"
                placeholder="Email here"
              />
              {errors.email?.message && <InputError message={errors.email.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('address1')}
                disabled={Boolean(cachedTransaction)}
                type="text"
                label="Address Line 1"
                placeholder="Address First Line"
              />
              {errors.address1?.message && <InputError message={errors.address1.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('city')}
                disabled={Boolean(cachedTransaction)}
                type="text"
                label="Town / City"
                placeholder="Town / City Name"
              />
              {errors.city?.message && <InputError message={errors.city.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('postalCode')}
                disabled={Boolean(cachedTransaction)}
                type="text"
                label="Post Code"
                placeholder="Post Code"
              />
              {errors.postalCode?.message && <InputError message={errors.postalCode.message} />}
            </InputWrap>
            <InputWrap>
              <InputGroup>
                <Select {...register('country')} disabled={Boolean(cachedTransaction)}>
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {COUNTRY_OPTIONS.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
                <Label>Country</Label>
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
                      disabled={Boolean(cachedTransaction)}
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
                disabled={Boolean(cachedTransaction)}
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
                      disabled={Boolean(cachedTransaction)}
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
                disabled={Boolean(cachedTransaction)}
                type="text"
                label="Security Code"
                placeholder="CSV on the back of card"
                maxLength={cardType === 'amex' ? 4 : 3}
              />
              {errors.securityCode?.message && <InputError message={errors.securityCode.message} />}
            </InputWrap>
          </FormLayout>
          <ButtonGroup>
            <Button
              intent="primary"
              type="submit"
              loading={transactionProcessing}
              disabled={transactionProcessing || Boolean(cachedTransaction)}
            >
              Make Payment
            </Button>
          </ButtonGroup>
        </form>
      )}
    </>
  )
}
