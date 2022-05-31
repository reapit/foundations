import { renderHook } from '@testing-library/react-hooks'
import { ReapitGetState, useReapitGet } from '..'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { getActions, getFetcher } from '@reapit/utils-common'
import { logger } from '../..'

const mockData = {
  someData: {
    someKey: 'someValue',
  },
}

const mockSuccess = jest.fn()
const mockError = jest.fn()

const mockFetcher = getFetcher as jest.Mock

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
  GetActionNames: {
    actionName: 'actionName',
  },
  getActions: () => ({
    actionName: {
      successMessage: 'Some success message',
      errorMessage: 'Some error message',
    },
  }),
  getFetcher: jest.fn(() => mockData),
}))

describe('useReapitGet', () => {
  it('should correctly set loading, fetch data, render a success message and refresh', async () => {
    const reapitConnectBrowserSession = {
      connectSession: jest.fn(
        () =>
          new Promise<void>((resolve) => {
            resolve()
          }),
      ),
    } as unknown as ReapitConnectBrowserSession
    const controller = new AbortController()
    const signal = controller.signal
    const mockFetchParams = {
      action: getActions('local')['actionName'],
      connectSession: {
        accessToken: 'SOME_TOKEN',
      },
      queryParams: undefined,
      headers: undefined,
      logger,
      failSilently: false,
      uriParams: undefined,
      signal,
    }

    const { result, waitForNextUpdate } = renderHook<{}, ReapitGetState<typeof mockData>>(() =>
      useReapitGet<typeof mockData>({
        reapitConnectBrowserSession,
        action: getActions('local')['actionName'],
      }),
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(mockSuccess).toHaveBeenCalledWith('Some success message')
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[0]).toEqual(mockData)
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual(null)

    const refresh = result.current[3]
    refresh()

    // TODO not sure why this isn't passing, need to resolve
    // expect(reapitConnectBrowserSession.connectSession).toHaveBeenCalledTimes(2)
  })

  it('should correctly refetch if the query parameter prop changes', async () => {
    const reapitConnectBrowserSession = {} as unknown as ReapitConnectBrowserSession
    const controller = new AbortController()
    const signal = controller.signal
    const mockFetchParams = {
      action: getActions('local')['actionName'],
      connectSession: {
        accessToken: 'SOME_TOKEN',
      },
      queryParams: {
        key: 'value',
      },
      headers: undefined,
      logger,
      failSilently: false,
      uriParams: undefined,
      signal,
    }

    const initialParams = {
      key: 'value',
    }

    const newParams = {
      newKey: 'newValue',
    }

    const { result, waitForNextUpdate, rerender } = renderHook<
      { queryParams: Object },
      ReapitGetState<typeof mockData>
    >(
      ({ queryParams }) =>
        useReapitGet<typeof mockData>({
          reapitConnectBrowserSession,
          action: getActions('local')['actionName'],
          queryParams,
        }),
      {
        initialProps: {
          queryParams: initialParams,
        },
      },
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(mockSuccess).toHaveBeenCalledWith('Some success message')
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[0]).toEqual(mockData)
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual(null)

    rerender({ queryParams: newParams })

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledTimes(2)
  })

  it('should wait to fetch until a known parm is true', async () => {
    const reapitConnectBrowserSession = {} as unknown as ReapitConnectBrowserSession
    const controller = new AbortController()
    const signal = controller.signal
    const mockFetchParams = {
      action: getActions('local')['actionName'],
      connectSession: {
        accessToken: 'SOME_TOKEN',
      },
      headers: undefined,
      logger,
      failSilently: false,
      uriParams: undefined,
      signal,
    }

    const { result, waitForNextUpdate, rerender } = renderHook<
      { fetchWhenTrue: any[] },
      ReapitGetState<typeof mockData>
    >(
      ({ fetchWhenTrue }) =>
        useReapitGet<typeof mockData>({
          reapitConnectBrowserSession,
          action: getActions('local')['actionName'],
          fetchWhenTrue,
        }),
      {
        initialProps: {
          fetchWhenTrue: [false],
        },
      },
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(false)

    expect(mockFetcher).not.toHaveBeenCalled()
    expect(mockSuccess).not.toHaveBeenCalled()
    expect(result.current[0]).toEqual(null)
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual(null)

    rerender({ fetchWhenTrue: [true] })

    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(mockSuccess).toHaveBeenCalledWith('Some success message')
    expect(mockError).not.toHaveBeenCalled()

    expect(result.current[0]).toEqual(mockData)
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual(null)

    expect(mockFetcher).toHaveBeenCalledTimes(1)
  })

  it('should return an error if the fetcher fails', async () => {
    mockFetcher.mockReturnValue('Some error message')

    const reapitConnectBrowserSession = {} as unknown as ReapitConnectBrowserSession
    const controller = new AbortController()
    const signal = controller.signal
    const mockFetchParams = {
      action: getActions('local')['actionName'],
      connectSession: {
        accessToken: 'SOME_TOKEN',
      },
      queryParams: undefined,
      headers: undefined,
      logger,
      failSilently: false,
      uriParams: undefined,
      signal,
    }

    const { result, waitForNextUpdate } = renderHook<{}, ReapitGetState<typeof mockData>>(() =>
      useReapitGet<typeof mockData>({
        reapitConnectBrowserSession,
        action: getActions('local')['actionName'],
      }),
    )
    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toBe(true)

    await waitForNextUpdate()

    expect(mockFetcher).toHaveBeenCalledWith(mockFetchParams)
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(mockSuccess).not.toHaveBeenCalled()
    expect(mockError).toHaveBeenCalledWith('Some error message', 5000 as any)

    expect(result.current[0]).toBeNull()
    expect(result.current[1]).toEqual(false)
    expect(result.current[2]).toEqual('Some error message')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
