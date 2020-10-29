import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { getProductDetails, createPaymentIntent } from '../../stripe-api/payment'
import { PaymentIntent, StripeCardElement } from '@stripe/stripe-js'
import { checkoutFormStyles } from './__styles__/checkout-form'

export default function CheckoutForm() {
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [error, setError] = useState('')
  const [metadata, setMetadata] = useState()
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    getProductDetails({}).then((productDetails) => {
      setAmount(productDetails.amount / 100)
      setCurrency(productDetails.currency)
    })

    // Step 2: Create PaymentIntent over Stripe API
    
    createPaymentIntent({})
      .then((clientSecret) => {
        setClientSecret(clientSecret)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    if(!stripe || !elements) return
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
    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>
      </div>
    )
  }

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    }

    return (
      <form className={checkoutFormStyles} onSubmit={handleSubmit}>
        <h1>
          {currency.toLocaleUpperCase()}{' '}
          {amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
          })}{' '}
        </h1>
        <h4>Pre-order the Pasha package</h4>

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

        <button
          className="btn"
          disabled={processing || !clientSecret || !stripe}
        >
          {processing ? 'Processing…' : 'Pay'}
        </button>
      </form>
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
