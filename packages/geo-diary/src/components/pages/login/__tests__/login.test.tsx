import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Login from '@/components/pages/login'
import { Button } from '@reapit/elements-legacy'
import { reapitConnectBrowserSession } from '@/core/connect-session'

jest.mock('@/core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLoginRedirect: jest.fn(),
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(render(<Login />)).toMatchSnapshot()
  })

  describe('loginHandler', () => {
    it('should correctly call redirect on click', () => {
      const wrapper = render(<Login />)

      wrapper.find(Button).first().simulate('click')

      expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
    })
  })
})
