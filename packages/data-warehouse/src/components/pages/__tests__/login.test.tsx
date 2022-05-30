import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Button } from '@reapit/elements-legacy'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { Login } from '../login'

jest.mock('../../../core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLoginRedirect: jest.fn(),
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('loginHandler', () => {
  it('should correctly call redirect on click', () => {
    const wrapper = render(<Login />)

    wrapper.find(Button).first().simulate('click')

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })
})
