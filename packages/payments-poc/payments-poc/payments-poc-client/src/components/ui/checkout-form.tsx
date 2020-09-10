import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../../stripe-api/payment'
import { StripeCardElement } from '@stripe/stripe-js'
import { checkoutFormStyles } from './__styles__/checkout-form'
import { Payment } from '../pages/authenticated'
import { Button, H5 } from '@reapit/elements'

export default function CheckoutForm({
  payment,
  propertyId,
}: {
  payment: Payment
  propertyId: string
}) {
  const { amount, currency } = payment
  const [clientSecret, setClientSecret] = useState('')
  const [error, setError] = useState('')
  const [metadata, setMetadata] = useState()
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent over Stripe API

    createPaymentIntent({ amount: amount * 100, currency })
      .then((clientSecret) => {
        setClientSecret(clientSecret)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [amount, currency])

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
      setMetadata(payload.paymentIntent as any)
      console.log('[PaymentIntent]', payload.paymentIntent)
    }
  }

  const renderSuccess = () => {
    console.log(JSON.stringify(metadata, null, 2))
    return (
      <H5>
        Payment of {currency} {amount} received for {propertyId}
      </H5>
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
        <H5>Payment for {propertyId}</H5>
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
