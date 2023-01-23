import React from 'react'
import { render } from '../../tests/react-testing'
import { mockPaymentModel } from '../../tests/__mocks__/payment'
import { mockPaymentProvider } from '../../tests/__mocks__/payment-provider'
import { PaymentForm } from '../payment-form'

describe('PaymentForm', () => {
  it('should match a snapshot when payment is pending', () => {
    const paymentProvider = Object.assign(mockPaymentProvider, {
      payment: {
        ...mockPaymentModel,
        status: 'pending',
      },
    })
    expect(render(<PaymentForm paymentProvider={paymentProvider} />)).toMatchSnapshot()
  })
  it('should match a snapshot when payment is rejected', () => {
    const paymentProvider = Object.assign(mockPaymentProvider, {
      payment: {
        ...mockPaymentModel,
        status: 'rejected',
      },
    })
    expect(render(<PaymentForm paymentProvider={paymentProvider} />)).toMatchSnapshot()
  })

  it('should match a snapshot when payment is posted', () => {
    const paymentProvider = Object.assign(mockPaymentProvider, {
      payment: {
        ...mockPaymentModel,
        status: 'posted',
      },
    })
    expect(render(<PaymentForm paymentProvider={paymentProvider} />)).toMatchSnapshot()
  })

  it('should match a snapshot when payment is awaitingPosting', () => {
    const paymentProvider = Object.assign(mockPaymentProvider, {
      payment: {
        ...mockPaymentModel,
        status: 'awaitingPosting',
      },
    })
    expect(render(<PaymentForm paymentProvider={paymentProvider} />)).toMatchSnapshot()
  })
})
