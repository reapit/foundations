import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockCardDetails } from '../../../tests/__mocks__/payment'
import { ResendConfirmButton } from '../payment-resend-confirm-button'

jest.mock('../../../../core/use-payments-state')

describe('ResendConfirmButton', () => {
  it('should match a snapshot', () => {
    expect(render(<ResendConfirmButton paymentFormValues={mockCardDetails} />)).toMatchSnapshot()
  })
})
