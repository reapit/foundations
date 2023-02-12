import React from 'react'
import { render } from '../../../tests/react-testing'
import PaymentPage from '..'
import { useLocation } from 'react-router'
import { useClientConfig, usePayment } from '../queries'
import { mockConfigModel } from '../../../tests/__mocks__/config'
import { mockPaymentWithPropertyModel } from '../../../tests/__mocks__/payment'
import { mockMerchantKey } from '../../../tests/__mocks__/opayo'

const session = 'sessiontoken'
const clientCode = 'SBOX'

const mockUseLocation = useLocation as jest.Mock

jest.mock('@reapit/payments-ui', () => ({
  ...jest.requireActual('@reapit/payments-ui'),
  useMerchantKey: jest.fn(() => ({ merchantKey: {}, merchantKeyLoading: false })),
  useTransaction: jest.fn(() => ({ transactionSubmit: jest.fn() })),
  handleLoadOpayoScript: jest.fn((config, setConfigLoading) => () => {
    setConfigLoading(false)
  }),
}))

jest.mock('../queries', () => ({
  ...jest.requireActual('../queries'),
  useClientConfig: jest.fn(() => ({ config: null, configError: null })),
  usePayment: jest.fn(() => ({ payment: null, paymentLoading: false, refreshPayment: jest.fn() })),
  useReceipt: jest.fn(() => ({ receiptLoading: {}, receiptSubmit: jest.fn() })),
  useStatusUpdate: jest.fn(() => ({ statusLoading: {}, statusSubmit: jest.fn() })),
  useMerchantKey: jest.fn(() => ({
    merchantKey: mockMerchantKey,
    merchantKeyLoading: false,
    refreshMerchantKey: jest.fn(),
  })),
}))

const mockUseClientConfig = useClientConfig as jest.Mock
const mockUsePayment = usePayment as jest.Mock

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useParams: () => ({
    paymentId: 'MKT20000010',
  }),
  useLocation: jest.fn(),
}))

describe('PaymentPage', () => {
  it('should match a snapshot when has no session and no data', () => {
    mockUseLocation.mockReturnValue({ location: { search: '' } })
    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has a session and data', () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    mockUseClientConfig.mockReturnValue({ config: mockConfigModel, configError: null })
    mockUsePayment.mockReturnValue({
      payment: mockPaymentWithPropertyModel,
      paymentLoading: false,
      refreshPayment: jest.fn(),
    })

    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when there is a config error', () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    mockUseClientConfig.mockReturnValue({
      config: null,
      configError: new Error('Config error'),
    })

    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    mockUseClientConfig.mockReturnValue({ config: null, configError: null })

    expect(render(<PaymentPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when no payment is returned', async () => {
    mockUseLocation.mockReturnValue({ search: `?session=${session}&clientCode=${clientCode}` })
    mockUseClientConfig.mockReturnValue({ config: mockUseClientConfig, configError: null })
    mockUsePayment.mockReturnValue({
      payment: null,
      paymentLoading: false,
      refreshPayment: jest.fn(),
    })

    const wrapper = render(<PaymentPage />)

    expect(wrapper).toMatchSnapshot()
  })
})
