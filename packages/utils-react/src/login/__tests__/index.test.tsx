import React from 'react'
import { Login, handleLoginClick } from '..'
import { render } from '@testing-library/react'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

describe('Login', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(
      render(<Login reapitConnectBrowserSession={{} as unknown as ReapitConnectBrowserSession} appName="test app" />),
    ).toMatchSnapshot()
  })
})

describe('handleLoginClick', () => {
  it('should correctly login user', () => {
    const reapitConnectBrowserSession = { connectLoginRedirect: jest.fn() } as unknown as ReapitConnectBrowserSession

    const curried = handleLoginClick(reapitConnectBrowserSession, '/test')

    curried()

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledWith('undefined/test')
  })
})
