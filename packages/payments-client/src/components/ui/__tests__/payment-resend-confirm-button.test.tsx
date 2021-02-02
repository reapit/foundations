import * as React from 'react'
import { shallow } from 'enzyme'
import { ResendConfirmButton } from '../payment-resend-confirm-button'
import { stubPaymentWithPropertyModel } from '../__stubs__/payment'

jest.mock('@reapit/elements', () => ({
  useFormikContext: jest.fn(() => ({
    values: { email: 'SOME_VALUE', customerFirstName: 'SOME_VALUE', customerLastName: 'SOME_VALUE' },
  })),
  Button: () => <button />,
}))

describe('ResendConfirmButton', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(<ResendConfirmButton payment={stubPaymentWithPropertyModel} session="some-session" />),
    ).toMatchSnapshot()
  })
})
