import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleGetMerchantKey, Payment } from '../payment'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockConfigModel } from '../../../tests/__mocks__/config'
import { mockPaymentModel } from '../../../tests/__mocks__/payment'
import { mockPropertyModel } from '../../../tests/__mocks__/property'
import { mockMerchantKey } from '../../../tests/__mocks__/opayo'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [false, mockMerchantKey, jest.fn()]),
}))

jest.mock('../../../core/use-config-state')

const mockUseReapitGet = useReapitGet as jest.Mock

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
  useLocation: jest.fn(),
}))

describe('Payment', () => {
  it('should match a snapshot with no data', () => {
    expect(render(<Payment paymentRequest={[null, false, null, jest.fn(), false, jest.fn()]} />)).toMatchSnapshot()
  })

  it('should match a snapshot with data', () => {
    mockUseReapitGet.mockReturnValue([mockPropertyModel, false])

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

describe('handleGetMerchantKey', () => {
  it('should get the merchant key', () => {
    const getMerchantKey = jest.fn()
    const idToken = 'MOCK_TOKEN'
    const config = mockConfigModel

    const curried = handleGetMerchantKey(getMerchantKey, idToken, config)

    curried()

    expect(getMerchantKey).toHaveBeenCalledTimes(1)
  })
})
