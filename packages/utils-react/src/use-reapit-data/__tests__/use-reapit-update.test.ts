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
  it('should correctly set loading, fetch data, render a success message and refresh', async () => {
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
    expect(result.current[3]).toBeNull()

    act(() => {
      result.current[2](objectBody)
    })

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(...mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[1]).toEqual(undefined)
    expect(result.current[0]).toEqual(false)
    expect(result.current[3]).toEqual(null)

    expect(mockFetcher).toHaveBeenCalledTimes(1)
  })
})
