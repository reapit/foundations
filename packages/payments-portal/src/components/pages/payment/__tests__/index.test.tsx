import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PaymentPage } from '..'
import { useLocation } from 'react-router'

const session = 'sessiontoken'
const clientCode = 'SBOX'

const mockUseLocation = useLocation as jest.Mock

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
  useLocation: jest.fn(),
}))

describe('PaymentPage', () => {
  it('should match a snapshot when has a session', () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no session', () => {
    mockUseLocation.mockReturnValue({ location: { search: '' } })
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })
})
