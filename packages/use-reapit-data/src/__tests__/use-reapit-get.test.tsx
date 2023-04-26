import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GetActionNames, getActions } from '../get-actions'
import { ReapitGetState, useReapitGet } from '../use-reapit-get'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

const mockData = {
  someData: {
    someKey: 'someValue',
  },
}

const mockSuccess = jest.fn()
const mockError = jest.fn()

const mockAxios = axios.get as unknown as jest.Mock

jest.mock('../..', () => ({
  logger: jest.fn(),
}))

jest.mock('@reapit/elements', () => ({
  useSnack: jest.fn(() => ({
    success: mockSuccess,
    error: mockError,
  })),
}))

const createWrapper = () => {
  const queryClient = new QueryClient()
  const Wrapper: PropsWithChildren<any> = ({ children }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  )

  return Wrapper
}

describe('useReapitGet', () => {
  it('should correctly set loading, fetch data, render a success message and refresh', async () => {
    const reapitConnectBrowserSession = {
      connectSession: jest.fn(() => ({
        accessToken: 'SOME_TOKEN',
      })),
    } as unknown as ReapitConnectBrowserSession

    mockAxios.mockReturnValue({
      data: mockData,
    })

    const action = {
      ...getActions[GetActionNames.getApps],
      successMessage: 'Some success message',
    }

    const { result, waitForNextUpdate } = renderHook<{}, ReapitGetState<typeof mockData>>(
      () =>
        useReapitGet<typeof mockData>({
          reapitConnectBrowserSession,
          action,
        }),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledWith('https://platform.dev.paas.reapit.cloud/marketplace/apps', {
      headers: { Authorization: 'Bearer SOME_TOKEN', 'Content-Type': 'application/json', 'api-version': 'latest' },
    })

    expect(mockAxios).toHaveBeenCalledTimes(1)

    expect(mockSuccess).toHaveBeenCalledWith('Some success message')
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[0]).toEqual(mockData)
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual(null)

    const refresh = result.current[3]

    refresh()

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledTimes(2)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
