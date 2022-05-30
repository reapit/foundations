import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { ResendConfirmButton } from '../payment-resend-confirm-button'
import { stubPaymentWithPropertyModel } from '../__stubs__/payment'

jest.mock('@reapit/elements-legacy', () => ({
  useFormikContext: jest.fn(() => ({
    values: { email: 'SOME_VALUE', customerFirstName: 'SOME_VALUE', customerLastName: 'SOME_VALUE' },
  })),
  Button: () => '',
}))

describe('ResendConfirmButton', () => {
  it('should match a snapshot', () => {
    expect(
      render(<ResendConfirmButton payment={stubPaymentWithPropertyModel} session="some-session" />),
    ).toMatchSnapshot()
  })
})
