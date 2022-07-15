import * as React from 'react'
import { render } from '../../../tests/react-testing'
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
