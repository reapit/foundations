import { renderHook } from '@testing-library/react-hooks'
import { useReapitConnect } from '../index'
import { ReapitConnectHook } from '../../types'
import { ReapitConnectBrowserSession } from '../../browser'
import { mockBrowserSession } from '../../__mocks__/session'

jest.mock('../../browser/index', () => ({
  ReapitConnectBrowserSession: jest.fn(() => ({
    connectSession: jest.fn(() => mockBrowserSession),
    connectIsDesktop: false,
    connectHasSession: true,
    connectAuthorizeRedirect: jest.fn(),
    connectLoginRedirect: jest.fn(),
    connectLogoutRedirect: jest.fn(),
    connectInternalRedirect: '/some-path?someQuery=true',
    connectClearSession: jest.fn(),
  })),
}))

export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: 'SOME_CLIENT_ID',
  connectOAuthUrl: 'SOME_URL',
  connectUserPoolId: 'SOME_USER_POOL_ID',
})

describe('useReapitConnect', () => {
  it('should return the current connectSession and methods correctly', async () => {
    const renderedHook = renderHook<{}, ReapitConnectHook>(() => useReapitConnect(reapitConnectBrowserSession))

    await renderedHook.waitForNextUpdate()

    const { result } = renderedHook

    expect(result.current.connectSession).toEqual(mockBrowserSession)
    expect(result.current.connectIsDesktop).toEqual(false)
    expect(result.current.connectHasSession).toEqual(true)
    expect(result.current.connectInternalRedirect).toEqual('/some-path?someQuery=true')

    result.current.connectLoginRedirect('uri')
    result.current.connectLogoutRedirect('uri')
    result.current.connectAuthorizeRedirect('uri')
    result.current.connectClearSession()

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
    expect(reapitConnectBrowserSession.connectLogoutRedirect).toHaveBeenCalledTimes(1)
    expect(reapitConnectBrowserSession.connectAuthorizeRedirect).toHaveBeenCalledTimes(1)
    expect(reapitConnectBrowserSession.connectClearSession).toHaveBeenCalledTimes(1)
  })
})
