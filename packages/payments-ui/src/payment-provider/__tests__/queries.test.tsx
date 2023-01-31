import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CreateTransactionModel, useMerchantKey, useTransaction } from '@reapit/payments-ui'
import { mockConfigModel } from '../../tests/__mocks__/config'
import { genPaymentsHeaders } from '../utils'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
}))

window.reapit.config.paymentsApiUrl = 'https://payments-service.reapit.cloud'

const mockSuccess = jest.fn()
const mockError = jest.fn()

const mockAxiosPost = axios.post as unknown as jest.Mock

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

describe('useMerchantKey', () => {
  it('should correctly, fetch data', async () => {
    const mockData = mockConfigModel
    mockAxiosPost.mockReturnValue({
      data: mockData,
    })

    const { result, waitForNextUpdate } = renderHook(() => useMerchantKey(mockConfigModel), {
      wrapper: createWrapper(),
    })

    expect(result.current.merchantKey).toBeNull()
    expect(result.current.merchantKeyLoading).toBe(true)

    await waitForNextUpdate()

    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://pi-test.sagepay.com/api/v1/merchant-session-keys',
      { vendorName: mockConfigModel.vendorName },
      {
        headers: genPaymentsHeaders(mockConfigModel),
      },
    )

    expect(mockAxiosPost).toHaveBeenCalledTimes(1)

    expect(result.current.merchantKey).toEqual(mockData)
    expect(result.current.merchantKeyLoading).toEqual(false)
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

    const { result, waitForNextUpdate } = renderHook(() => useTransaction(mockConfigModel), {
      wrapper: createWrapper(),
    })

    const returnedValue = await result.current.transactionSubmit({} as CreateTransactionModel)

    await waitForNextUpdate()

    expect(mockAxiosPost).toHaveBeenCalledWith(
      'https://pi-test.sagepay.com/api/v1/transactions',
      {},
      {
        headers: genPaymentsHeaders(mockConfigModel),
      },
    )

    expect(mockAxiosPost).toHaveBeenCalledTimes(1)

    expect(returnedValue).toEqual({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
