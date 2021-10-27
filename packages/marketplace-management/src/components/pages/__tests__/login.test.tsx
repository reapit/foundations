import React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { Login } from '../login'
import { render } from '@testing-library/react'

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

    wrapper.getByText('Login').click()

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })
})
