import React from 'react'
import { Login, onLoginButtonClick } from '..'
import { getReapitConnectBrowserSession } from '../../../../core/connect-session'
import { render } from '../../../../tests/react-testing'

describe('Login', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(render(<Login />)).toMatchSnapshot()
  })
})

describe('onLoginButtonClick', () => {
  it('should correctly login user', () => {
    const loginSpy = jest.spyOn(getReapitConnectBrowserSession(process.env), 'connectLoginRedirect')
    const curried = onLoginButtonClick()
    curried()
    expect(loginSpy).toBeCalled()
  })
})
