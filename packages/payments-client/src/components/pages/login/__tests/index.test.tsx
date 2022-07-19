import React from 'react'
import { Login, onLoginButtonClick } from '..'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { render } from '../../../../tests/react-testing'

describe('Login', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(render(<Login />)).toMatchSnapshot()
  })
})

describe('onLoginButtonClick', () => {
  it('should run correctly', () => {
    const spyFn = jest.spyOn(reapitConnectBrowserSession, 'connectLoginRedirect')
    const fn = onLoginButtonClick()
    fn()
    expect(spyFn).toBeCalled()
  })
})
