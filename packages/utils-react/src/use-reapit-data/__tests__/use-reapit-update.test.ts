import { renderHook, act } from '@testing-library/react-hooks'
import { ReapitUpdateState, useReapitUpdate } from '..'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { UpdateActionNames } from '@reapit/utils-common'

const mockData = {
  someData: {
    someKey: 'someValue',
  },
}

const mockSuccess = jest.fn()
const mockError = jest.fn()

const mockFetcher = fetch as jest.Mock

jest.mock('../..', () => ({
  logger: jest.fn(),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      accessToken: 'SOME_TOKEN',
    },
  }),
}))

jest.mock('@reapit/elements', () => ({
  useSnack: jest.fn(() => ({
    success: mockSuccess,
    error: mockError,
  })),
}))

jest.mock('@reapit/utils-common', () => ({
  UpdateActionNames: {
    actionName: 'actionName',
  },
  updateActions: {
    actionName: {
      api: 'https://api.test.reapit.com',
      path: '/path',
      successMessage: 'Some success message',
      errorMessage: 'Some error message',
    },
  },
  getFetcher: jest.fn(() => mockData),
}))

describe('useReapitUpdate', () => {
  it('should correctly set loading, send data without data update', async () => {
    const reapitConnectBrowserSession = {} as unknown as ReapitConnectBrowserSession
    const objectBody = {
      test: true,
    }
    const mockFetchParams = [
      'https://api.test.reapit.com/path',
      {
        headers: {
          Authorization: 'Bearer SOME_TOKEN',
          ['Content-Type']: 'application/json',
          ['api-version']: 'latest',
        },
        method: 'POST',
        body: JSON.stringify(objectBody),
      },
    ]

    const { result, waitForNextUpdate } = renderHook<{}, ReapitUpdateState<{}, typeof mockData>>(() =>
      useReapitUpdate<{}, typeof mockData>({
        reapitConnectBrowserSession,
        action: 'actionName' as UpdateActionNames,
      }),
    )
    expect(result.current[0]).toBeFalsy()
    expect(result.current[1]).toBeUndefined()
    expect(result.current[2]).toBeInstanceOf(Function)
    expect(result.current[3]).toBeUndefined()

    act(() => {
      result.current[2](objectBody)
    })

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(...mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[1]).toEqual(undefined)
    expect(result.current[0]).toEqual(false)
    expect(result.current[3]).toEqual(true)

    expect(mockFetcher).toHaveBeenCalledTimes(1)
  })

  it('should correctly set loading, send data with data update', async () => {
    const reapitConnectBrowserSession = {} as unknown as ReapitConnectBrowserSession
    const objectBody = {
      test: true,
    }
    const mockFetchParams = [
      'https://api.test.reapit.com/path',
      {
        headers: {
          Authorization: 'Bearer SOME_TOKEN',
          ['Content-Type']: 'application/json',
          ['api-version']: 'latest',
        },
        method: 'POST',
        body: JSON.stringify(objectBody),
      },
    ]

    const headers = new Headers
    headers.append('Location', 'https://api.test.reapit.com/path')

    mockFetcher.mockReturnValue(new Response(JSON.stringify({ ...objectBody, updated: true }), {
      headers,
    }))

    const { result, waitForNextUpdate } = renderHook<{}, ReapitUpdateState<{}, typeof mockData>>(() =>
      useReapitUpdate<{}, typeof mockData>({
        reapitConnectBrowserSession,
        action: 'actionName' as UpdateActionNames,
        returnUpdatedModel: true,
      }),
    )
    expect(result.current[0]).toBeFalsy()
    expect(result.current[1]).toBeUndefined()
    expect(result.current[2]).toBeInstanceOf(Function)
    expect(result.current[3]).toBeUndefined()

    act(() => {
      result.current[2](objectBody)
    })

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(...mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(3)
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[1]).toEqual({...objectBody, updated: true})
    expect(result.current[0]).toEqual(false)
    expect(result.current[3]).toEqual(true)

    expect(mockFetcher).toHaveBeenCalledTimes(3)
  })
})
