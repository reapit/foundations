import React from 'react'
import { render } from '@testing-library/react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { LoginPage } from '../login-page'

jest.mock('../../../core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLoginRedirect: jest.fn(),
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<LoginPage />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('loginHandler', () => {
  it('should correctly call redirect on click', async () => {
    const wrapper = render(<LoginPage />)

    const button = await wrapper.findByText('Login')

    button.click()

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })
})
