import React from 'react'
import { shallow } from 'enzyme'
import { ReapitConnectContext } from '../index'
import { renderHook } from '@testing-library/react-hooks'
import { useReapitConnect } from '../index'
import { ReapitConnectHook } from '../../types'
import { ReapitConnectBrowserSession } from '../../browser'
import { mockBrowserSession } from '../../__mocks__/browser-session'

jest.mock('../../browser/index', () => ({
  ReapitConnectBrowserSession: jest.fn(() => ({
    connectSession: jest.fn(() => mockBrowserSession),
    connectIsDesktop: false,
    connectAuthorizeRedirect: jest.fn(),
    connectLoginRedirect: jest.fn(),
    connectLogoutRedirect: jest.fn(),
  })),
}))

export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: 'SOME_CLIENT_ID',
  connectOAuthUrl: 'SOME_URL',
})

describe('useReapitConnect', () => {
  it('should return the current connectSession and methods correctly', async () => {
    const renderedHook = renderHook<{}, ReapitConnectHook>(() => useReapitConnect(reapitConnectBrowserSession))

    await renderedHook.waitForNextUpdate()

    const { result } = renderedHook

    expect(result.current.connectSession).toEqual(mockBrowserSession)
    expect(result.current.connectIsDesktop).toEqual(false)

    result.current.connectLoginRedirect('uri')
    result.current.connectLogoutRedirect('uri')
    result.current.connectAuthorizeRedirect('uri')

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
    expect(reapitConnectBrowserSession.connectLogoutRedirect).toHaveBeenCalledTimes(1)
    expect(reapitConnectBrowserSession.connectAuthorizeRedirect).toHaveBeenCalledTimes(1)
  })
})

describe('ReapitConnectContext', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <ReapitConnectContext.Provider
        value={{
          connectSession: mockBrowserSession,
          connectAuthorizeRedirect: jest.fn(),
          connectLoginRedirect: jest.fn(),
          connectLogoutRedirect: jest.fn(),
          connectIsDesktop: false,
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
