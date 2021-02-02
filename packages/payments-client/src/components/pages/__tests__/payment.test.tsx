import * as React from 'react'
import { shallow } from 'enzyme'
import PaymentPage from '../payment'
import { useLocation } from 'react-router'

const session = 'sessiontoken'
const clientCode = 'SBOX'

// const mockUseParams = useParams as jest.Mock
const mockUseLocation = useLocation as jest.Mock

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
  useLocation: jest.fn(),
}))

describe('PaymentPage', () => {
  it('should match a snapshot when has a session', () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    expect(shallow(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no session', () => {
    mockUseLocation.mockReturnValue({ location: { search: '' } })
    expect(shallow(<PaymentPage />)).toMatchSnapshot()
  })
})
