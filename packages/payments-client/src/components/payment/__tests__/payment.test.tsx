import React from 'react'
import { render } from '../../../tests/react-testing'
import { Payment } from '../payment'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockConfigModel } from '../../../tests/__mocks__/config'
import { mockPaymentModel } from '../../../tests/__mocks__/payment'
import { mockPropertyModel } from '../../../tests/__mocks__/property'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
}))

jest.mock('@reapit/payments-ui', () => ({
  ...jest.requireActual('@reapit/payments-ui'),
  useMerchantKey: jest.fn(() => ({ merchantKey: {}, merchantKeyLoading: false })),
  useTransaction: jest.fn(() => ({ transactionSubmit: jest.fn() })),
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
    expect(render(<Payment paymentRequest={[null, false, null, jest.fn(), false, jest.fn()]} />)).toMatchSnapshot()
  })

  it('should match a snapshot with data', () => {
    mockUseReapitGet.mockReturnValue([mockConfigModel, false]).mockReturnValue([mockPropertyModel, false])

    expect(
      render(<Payment paymentRequest={[mockPaymentModel, false, null, jest.fn(), false, jest.fn()]} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when the payment does not return', () => {
    mockUseReapitGet.mockReturnValueOnce([mockConfigModel, false]).mockReturnValueOnce([null, false])

    expect(render(<Payment paymentRequest={[null, false, null, jest.fn(), false, jest.fn()]} />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])
    expect(render(<Payment paymentRequest={[null, true, null, jest.fn(), false, jest.fn()]} />)).toMatchSnapshot()
  })
})
