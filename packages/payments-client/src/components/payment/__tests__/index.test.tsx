import React from 'react'
import { render } from '../../../tests/react-testing'
import { PaymentPage } from '..'
import { mockPaymentModel } from '../../../tests/__mocks__/payment'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockPaymentModel, false]),
}))

jest.mock('../../../core/use-config-state')

describe('PaymentPage', () => {
  it('should match a snapshot', () => {
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })
})
