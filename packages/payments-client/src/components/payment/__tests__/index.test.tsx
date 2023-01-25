import React from 'react'
import { render } from '../../../tests/react-testing'
import PaymentPage from '..'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockConfigModel } from '../../../tests/__mocks__/config'
import { mockPaymentModel } from '../../../tests/__mocks__/payment'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
  useLocation: jest.fn(),
}))

describe('PaymentPage', () => {
  it('should match a snapshot with no data', () => {
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot with data', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockConfigModel, false])
      .mockReturnValueOnce([mockPaymentModel, false])
      .mockReturnValueOnce([mockPaymentModel, false])
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })
})
