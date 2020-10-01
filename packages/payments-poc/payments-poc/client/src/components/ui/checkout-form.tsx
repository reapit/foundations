import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { checkoutFormStyles } from './__styles__/checkout-form'
import { Button, Alert } from '@reapit/elements'
import {
  createStripePaymentIntent,
  StripePaymentIntentRequest,
} from '../../payments-api/stripe'
import { PropertyModel } from '@reapit/foundations-ts-definitions'

export default function CheckoutForm({
  payment,
  property,
  // closeModal,
  setIsOverdue
}: {
  payment: StripePaymentIntentRequest
  property: PropertyModel
  // closeModal: () => void
  setIsOverdue: (isOverdue: boolean) => void
}) {
  const { amount, currency, transfer_data } = payment
  const [clientSecret, setClientSecret] = useState('')
  const [error, setError] = useState('')
  // const [metadata, setMetadata] = useState()
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    createStripePaymentIntent({ amount: amount * 100, currency, transfer_data })
      .then((clientSecret) => {
        setClientSecret(clientSecret as string)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [amount, currency, transfer_data])

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    if (!stripe || !elements) return
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: ev.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`)
      setProcessing(false)
      console.log('[error]', payload.error)
    } else {
      setError('')
      setSucceeded(true)
      setProcessing(false)
      // setMetadata(payload.paymentIntent as any)
      console.log('[PaymentIntent]', payload.paymentIntent)
    }
  }

  const renderSuccess = () => {
    // console.log(JSON.stringify(metadata, null, 2))
    setIsOverdue(false)

    return (
      <>
        <Alert
          type="success"
          message={`Payment of ${currency} ${amount} received for ${property.id}`}
        />

        {/* <Button variant="primary" fullWidth onClick={closeModal}>
          Continue
        </Button> */}
      </>
    )
  }

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Roboto", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#006580',
          iconColor: '#fa755a',
        },
      },
    }

    return (
      <>
        <form className={checkoutFormStyles} onSubmit={handleSubmit}>
          <h1>
            {currency.toLocaleUpperCase()}{' '}
            {amount.toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
            })}{' '}
          </h1>
          <div className="sr-combo-inputs">
            <div className="sr-combo-inputs-row">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                autoComplete="cardholder"
                className="sr-input"
              />
            </div>

            <div className="sr-combo-inputs-row">
              <CardElement
                className="sr-input sr-card-element"
                options={options}
              />
            </div>
          </div>

          {error && <div className="message sr-field-error">{error}</div>}

          <Button
            type="submit"
            disabled={processing || !clientSecret || !stripe}
          >
            {processing ? 'Processing…' : 'Pay'}
          </Button>
        </form>
      </>
    )
  }

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  )
}
