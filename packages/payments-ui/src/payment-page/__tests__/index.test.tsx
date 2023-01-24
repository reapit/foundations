import React from 'react'
import { render } from '../../tests/react-testing'
import { PaymentPageContent } from '..'
import { useLocation } from 'react-router'
import { mockPaymentProvider } from '../../tests/__mocks__/payment-provider'

const session = 'sessiontoken'
const clientCode = 'SBOX'

const mockUseLocation = useLocation as jest.Mock

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}))

describe('PaymentPageContent', () => {
  it('should match a snapshot when has a session', () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    expect(render(<PaymentPageContent paymentProvider={mockPaymentProvider} />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no session', () => {
    mockUseLocation.mockReturnValue({ location: { search: '' } })
    expect(render(<PaymentPageContent paymentProvider={mockPaymentProvider} />)).toMatchSnapshot()
  })
})
