import React from 'react'
import { Login, handleLoginClick } from '..'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { render } from '../../../tests/react-testing'

jest.mock('../../../core/analytics')

describe('Login', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(render(<Login />)).toMatchSnapshot()
  })
})

describe('handleLoginClick', () => {
  it('should correctly login user', () => {
    const loginSpy = jest.spyOn(reapitConnectBrowserSession, 'connectLoginRedirect')

    handleLoginClick()

    expect(loginSpy).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickLoginWebButton, true)
  })
})
