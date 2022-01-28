import { renderHook, act } from '@testing-library/react-hooks'
import { useReapitUpdate } from '..'
import { ReapitConnectBrowserSession, ReapitConnectSession } from '@reapit/connect-session'
import { UpdateAction, updateActions } from '@reapit/utils-common'
import { send, ReapitUpdateState, UpdateReturnTypeEnum, handleSuccess } from '../use-reapit-update'

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
  updateActions: () => ({
    actionName: {
      api: 'https://api.test.reapit.com',
      path: '/path',
      successMessage: 'Some success message',
      errorMessage: 'Some error message',
    },
  }),
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
        action: updateActions('local')['actionName'],
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

    const headers = new Headers()
    headers.append('Location', 'https://api.test.reapit.com/path')

    mockFetcher.mockReturnValue(
      new Response(JSON.stringify({ ...objectBody, updated: true }), {
        headers,
      }),
    )

    const { result, waitForNextUpdate } = renderHook<{}, ReapitUpdateState<{}, typeof mockData>>(() =>
      useReapitUpdate<{}, typeof mockData>({
        reapitConnectBrowserSession,
        action: updateActions('local')['actionName'],
        returnType: UpdateReturnTypeEnum.RESPONSE,
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
    expect(mockFetcher).toHaveBeenCalledTimes(2)
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[1]).toEqual({ ...objectBody, updated: true })
    expect(result.current[0]).toEqual(false)
    expect(result.current[3]).toEqual(true)

    expect(mockFetcher).toHaveBeenCalledTimes(2)
  })

  describe('sendFunc', () => {
    it('Can return data', async () => {
      const setLoading = jest.fn()
      const setError = jest.fn()
      const setData = jest.fn()
      const setSuccess = jest.fn()
      const reapitConnectSession = { accessToken: 'accessToken' } as unknown as ReapitConnectSession
      const payload = {
        response: true,
      }

      mockFetcher.mockReturnValue(
        new Response(JSON.stringify(payload), {
          headers: {
            Location: 'getfromhere',
          },
        }),
      )

      const testFunc = send<{}, {}>({
        setLoading,
        setError,
        setData,
        setSuccess,
        action: updateActions('local')['actionName'],
        method: 'POST',
        returnType: UpdateReturnTypeEnum.RESPONSE,
        headers: {},
        error: null,
        connectSession: reapitConnectSession,
        errorSnack: () => {},
        canCall: true,
      })

      await testFunc({})

      expect(setLoading).toHaveBeenCalledTimes(2)
      expect(setData).toHaveBeenCalledWith(payload)
      expect(setError).toHaveBeenCalledTimes(0)
      expect(setSuccess).toHaveBeenCalledWith(true)
    })
  })

  describe('handleSuccess', () => {
    it('should handle success messaging', () => {
      const action = {
        successMessage: 'success',
      } as UpdateAction
      const success = true
      const successSnack = jest.fn()

      const curried = handleSuccess(action, success, successSnack)

      curried()

      expect(successSnack).toHaveBeenCalledWith(action.successMessage)
    })

    it('should not call the snack if success is undefined', () => {
      const action = {
        successMessage: 'success',
      } as UpdateAction
      const success = undefined
      const successSnack = jest.fn()

      const curried = handleSuccess(action, success, successSnack)

      curried()

      expect(successSnack).not.toHaveBeenCalled()
    })
  })

  afterAll(() => {
    mockFetcher.mockClear()
  })
})
