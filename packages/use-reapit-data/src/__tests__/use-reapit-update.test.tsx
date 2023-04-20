import React, { PropsWithChildren } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useReapitUpdate } from '../use-reapit-update'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { ReapitUpdateState, UpdateReturnTypeEnum } from '../use-reapit-update'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UpdateActionNames, updateActions } from '../update-actions'

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockData = {
  someData: {
    someKey: 'someValue',
  },
}

const mockSuccess = jest.fn()
const mockError = jest.fn()

const mockAxios = axios as unknown as jest.Mock

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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return Wrapper
}

describe('useReapitUpdate', () => {
  it('should correctly set loading, send data without data update', async () => {
    const reapitConnectBrowserSession = {
      connectSession: jest.fn(() => ({
        accessToken: 'SOME_TOKEN',
      })),
    } as unknown as ReapitConnectBrowserSession
    const objectBody = {
      test: true,
    }

    const { result, waitForNextUpdate } = renderHook<{}, ReapitUpdateState<{}, typeof mockData>>(
      () =>
        useReapitUpdate<{}, typeof mockData>({
          reapitConnectBrowserSession,
          action: updateActions[UpdateActionNames.updateDeveloper],
          uriParams: {
            developerId: 'FOO',
          },
        }),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current[0]).toBeFalsy()
    expect(result.current[1]).toBeUndefined()
    expect(result.current[2]).toBeInstanceOf(Function)
    expect(result.current[3]).toBeFalsy()

    act(() => {
      result.current[2](objectBody)
    })

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledWith('https://platform.dev.paas.reapit.cloud/marketplace/developers/FOO', {
      data: { test: true },
      headers: { Authorization: 'Bearer SOME_TOKEN', 'Content-Type': 'application/json', 'api-version': 'latest' },
      method: 'POST',
    })
    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[1]).toEqual(true)
    expect(result.current[0]).toEqual(false)
    expect(result.current[3]).toEqual(true)
    expect(mockSuccess).toHaveBeenCalledWith('Your developer record has been successfully updated')

    expect(mockAxios).toHaveBeenCalledTimes(1)
  })

  it('should correctly set loading, send data with data update', async () => {
    const reapitConnectBrowserSession = {
      connectSession: jest.fn(() => ({
        accessToken: 'SOME_TOKEN',
      })),
    } as unknown as ReapitConnectBrowserSession
    const objectBody = {
      test: true,
    }

    const headers = new Headers()
    headers.append('Location', 'https://api.test.reapit.com/path')

    mockAxios.mockReturnValue({
      headers,
      data: { updated: true },
    })

    const { result, waitForNextUpdate } = renderHook<{}, ReapitUpdateState<{}, typeof mockData>>(
      () =>
        useReapitUpdate<{}, typeof mockData>({
          reapitConnectBrowserSession,
          action: updateActions[UpdateActionNames.updateDeveloper],
          returnType: UpdateReturnTypeEnum.LOCATION,
        }),
      {
        wrapper: createWrapper(),
      },
    )
    expect(result.current[0]).toBeFalsy()
    expect(result.current[1]).toBeUndefined()
    expect(result.current[2]).toBeInstanceOf(Function)
    expect(result.current[3]).toBeFalsy()

    act(() => {
      result.current[2](objectBody)
    })

    await waitForNextUpdate()

    expect(mockAxios).toHaveBeenCalledTimes(2)

    expect(mockAxios).toHaveBeenCalledWith(
      'https://platform.dev.paas.reapit.cloud/marketplace/developers/{developerId}',
      {
        data: { test: true },
        headers: { Authorization: 'Bearer SOME_TOKEN', 'Content-Type': 'application/json', 'api-version': 'latest' },
        method: 'POST',
      },
    )

    expect(mockAxios).toHaveBeenLastCalledWith('https://api.test.reapit.com/path', {
      headers: {
        Authorization: 'Bearer SOME_TOKEN',
        'Content-Type': 'application/json',
        'api-version': 'latest',
      },
      method: 'GET',
    })

    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[0]).toEqual(false)
    expect(result.current[1]).toEqual({ updated: true })
    expect(result.current[3]).toEqual(true)
    expect(mockSuccess).toHaveBeenCalledWith('Your developer record has been successfully updated')

    expect(mockAxios).toHaveBeenCalledTimes(2)
  })

  afterEach(() => {
    mockAxios.mockClear()
  })
})
