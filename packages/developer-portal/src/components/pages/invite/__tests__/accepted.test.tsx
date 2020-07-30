import React from 'react'
import { shallow } from 'enzyme'
import AcceptedModal, { handleLogin } from '../accepted'

describe('AcceptedModal', () => {
  it('should match snapshot', () => {
    expect(shallow(<AcceptedModal visible />)).toMatchSnapshot()
  })
})

describe('handleLogin', () => {
  it('should run correctly', () => {
    const reapitConnectBrowserSession = {
      connectHasSession: false,
      connectLogoutRedirect: jest.fn(),
    }
    jest.mock('@/core/connect-session', () => ({
      reapitConnectBrowserSession,
    }))
    const history = {
      replace: jest.fn(),
    }
    const fn = handleLogin(history)
    fn()
    expect(history.replace).toBeCalled()
  })
})
