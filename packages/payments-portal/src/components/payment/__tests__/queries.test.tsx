import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useClientConfig, useMerchantKey, usePayment, useReceipt, useStatusUpdate, useTransaction } from '../queries'
import { mockConfigModel } from '../../../tests/__mocks__/config'
import { mockPaymentWithPropertyModel } from '../../../tests/__mocks__/payment'
import { CreateTransactionModel, PaymentEmailReceipt, UpdateStatusBody } from '@reapit/payments-ui'
import { mockMerchantKey } from '../../../tests/__mocks__/opayo'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
}))

process.env.paymentsApiUrl = 'https://payments-service.reapit.cloud'
process.env.apiKey = 'MOCK_API_KEY'
process.env.appId = 'MOCK_APP_ID'

const mockSuccess = jest.fn()
const mockError = jest.fn()
const mockSession = 'MOCK_SESSION'
const mockClientCode = 'MOCK_CLIENT_CODE'
const mockPaymentId = 'MOCK_PAYMENT_ID'

const mockAxios = axios.get as unknown as jest.Mock
const mockAxiosPost = axios.post as unknown as jest.Mock
const mockAxiosPatch = axios.patch as unknown as jest.Mock

jest.mock('@reapit/elements', () => ({
  useSnack: jest.fn(() => ({
    success: mockSuccess,
    error: mockError,
  })),
}))

const createWrapper = () => {
  const queryClient = new QueryClient()
  const Wrapper: PropsWithChildren<any> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return Wrapper
}

describe('useClientConfig', () => {
  it('should correctly set loading, fetch data', async () => {
    const mockData = mockConfigModel
    mockAxios.mockReturnValue({
      data: mockData,
    })

    const { result, waitForNextUpdate } = renderHook(
      () => useClientConfig(mockSession, mockClientCode, mockPaymentId),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current.config).toBeNull()

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledWith('https://payments-service.reapit.cloud/config/public/MOCK_PAYMENT_ID', {
      headers: {
        'X-Api-Key': 'MOCK_API_KEY',
        'reapit-customer': 'MOCK_CLIENT_CODE',
        'reapit-session': 'MOCK_SESSION',
        'reapit-app-id': 'MOCK_APP_ID',
      },
    })

    expect(mockAxios).toHaveBeenCalledTimes(1)

    expect(result.current.config).toEqual(mockData)
    expect(result.current.configError).toEqual(null)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})

describe('usePayment', () => {
  it('should correctly set loading, fetch data', async () => {
    const mockData = mockPaymentWithPropertyModel
    mockAxios.mockReturnValue({
      data: mockData,
    })

    const { result, waitForNextUpdate } = renderHook(() => usePayment(mockSession, mockClientCode, mockPaymentId), {
      wrapper: createWrapper(),
    })
    expect(result.current.payment).toBeNull()
    expect(result.current.paymentLoading).toBe(true)

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledWith('https://payments-service.reapit.cloud/payments/MOCK_PAYMENT_ID', {
      headers: {
        'X-Api-Key': 'MOCK_API_KEY',
        'reapit-customer': 'MOCK_CLIENT_CODE',
        'reapit-session': 'MOCK_SESSION',
        'reapit-app-id': 'MOCK_APP_ID',
        'api-version': 'latest',
      },
    })

    expect(mockAxios).toHaveBeenCalledTimes(1)

    expect(result.current.payment).toEqual(mockData)
    expect(result.current.paymentLoading).toEqual(false)

    result.current.refreshPayment()

    expect(mockAxios).toHaveBeenCalledTimes(2)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})

describe('useReceipt', () => {
  it('should correctly send the update', async () => {
    mockAxiosPost.mockReturnValue({
      data: {},
    })

    const { result, waitForNextUpdate } = renderHook(() => useReceipt(mockSession, mockClientCode, mockPaymentId), {
      wrapper: createWrapper(),
    })

    expect(result.current.receiptLoading).toBe(false)

    const returnedValue = await result.current.receiptSubmit({} as PaymentEmailReceipt)

    await waitForNextUpdate()

    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://payments-service.reapit.cloud/receipt/public/MOCK_PAYMENT_ID',
      {},
      {
        headers: {
          'X-Api-Key': 'MOCK_API_KEY',
          'reapit-customer': 'MOCK_CLIENT_CODE',
          'reapit-session': 'MOCK_SESSION',
          'reapit-app-id': 'MOCK_APP_ID',
        },
      },
    )

    expect(mockAxiosPost).toHaveBeenCalledTimes(1)

    expect(returnedValue).toEqual(true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})

describe('useStatusUpdate', () => {
  it('should correctly send the update', async () => {
    mockAxiosPatch.mockReturnValue({
      data: {},
    })

    const { result, waitForNextUpdate } = renderHook(
      () => useStatusUpdate(mockSession, mockClientCode, mockPaymentWithPropertyModel),
      {
        wrapper: createWrapper(),
      },
    )

    expect(result.current.statusLoading).toBe(false)

    const returnedValue = await result.current.statusSubmit({} as UpdateStatusBody)

    await waitForNextUpdate()

    expect(mockAxiosPatch).toHaveBeenCalledWith(
      'https://payments-service.reapit.cloud/payments/' + mockPaymentWithPropertyModel.id,
      {},
      {
        headers: {
          'X-Api-Key': 'MOCK_API_KEY',
          'reapit-customer': 'MOCK_CLIENT_CODE',
          'reapit-session': 'MOCK_SESSION',
          'reapit-app-id': 'MOCK_APP_ID',
          'If-Match': mockPaymentWithPropertyModel._eTag,
          'api-version': 'latest',
        },
      },
    )

    expect(mockAxiosPatch).toHaveBeenCalledTimes(1)

    expect(returnedValue).toEqual(true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})

describe('useTransaction', () => {
  it('should correctly send the update', async () => {
    mockAxiosPost.mockReturnValue({
      data: {},
    })

    const { result, waitForNextUpdate } = renderHook(() => useTransaction(mockSession, mockClientCode, mockPaymentId), {
      wrapper: createWrapper(),
    })

    const returnedValue = await result.current.transactionSubmit({} as CreateTransactionModel)

    await waitForNextUpdate()

    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://payments-service.reapit.cloud/opayo/public/transactions/' + mockPaymentId,
      {},
      {
        headers: {
          'X-Api-Key': 'MOCK_API_KEY',
          'reapit-customer': 'MOCK_CLIENT_CODE',
          'reapit-session': 'MOCK_SESSION',
          'reapit-app-id': 'MOCK_APP_ID',
        },
      },
    )

    expect(mockAxiosPost).toHaveBeenCalledTimes(1)

    expect(returnedValue).toEqual({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})

describe('useMerchantKey', () => {
  it('should correctly set loading, fetch data', async () => {
    const mockData = mockMerchantKey
    mockAxiosPost.mockReturnValue({
      data: mockData,
    })

    const { result, waitForNextUpdate } = renderHook(
      () => useMerchantKey(mockSession, mockConfigModel, mockPaymentId),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current.merchantKey).toBeNull()
    expect(result.current.merchantKeyLoading).toBe(true)

    await waitForNextUpdate()

    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://payments-service.reapit.cloud/opayo/public/merchant-session-keys/MOCK_PAYMENT_ID',
      undefined,
      {
        headers: {
          'X-Api-Key': 'MOCK_API_KEY',
          'reapit-customer': 'SBOX',
          'reapit-session': 'MOCK_SESSION',
          'reapit-app-id': 'MOCK_APP_ID',
        },
      },
    )

    expect(mockAxiosPost).toHaveBeenCalledTimes(1)

    expect(result.current.merchantKey).toEqual(mockData)
    expect(result.current.merchantKeyLoading).toEqual(false)

    result.current.getMerchantKey()

    expect(mockAxiosPost).toHaveBeenCalledTimes(2)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
