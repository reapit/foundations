import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Login } from '@/components/pages/login'

jest.mock('@/core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLoginRedirect: jest.fn(),
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(render(<Login />)).toMatchSnapshot()
  })
})
