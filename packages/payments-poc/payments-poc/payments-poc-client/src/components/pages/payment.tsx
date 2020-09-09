import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../ui/checkout-form'
import { getPublicStripeKey } from '../../stripe-api/payment'

const stripePromise = getPublicStripeKey({}).then((key) => loadStripe(key))

export default function PaymentPage() {
  return (
    <div className="App">
      <div className="sr-root">
        <div className="sr-main">
          <header className="sr-header">
            <div className="sr-header__logo" />
          </header>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  )
}
