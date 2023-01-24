import React from 'react'
import { render } from '../../tests/react-testing'
import { mockCardDetails } from '../../tests/__mocks__/opayo'
import { mockPaymentProvider } from '../../tests/__mocks__/payment-provider'
import { ResendConfirmButton } from '../payment-resend-confirm-button'

describe('ResendConfirmButton', () => {
  it('should match a snapshot', () => {
    expect(
      render(<ResendConfirmButton paymentFormValues={mockCardDetails} paymentProvider={mockPaymentProvider} />),
    ).toMatchSnapshot()
  })
})
