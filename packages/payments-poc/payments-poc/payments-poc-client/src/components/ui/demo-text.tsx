import React from 'react'
import { demoTextStyles } from './__styles__/demo-text'

export default function DemoText() {
  return (
    <div className={demoTextStyles}>
      <span>
        This is a{' '}
        <a href="https://github.com/stripe-samples"> Stripe Sample </a> on how
        to build a payment form in React to accept card payments.{' '}
        <a href="https://github.com/stripe-samples/react-elements-card-payment">
          View code on GitHub.
        </a>
      </span>
    </div>
  )
}
