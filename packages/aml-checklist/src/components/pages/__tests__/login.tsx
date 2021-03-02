import * as React from 'react'
import { shallow } from 'enzyme'
import { Login } from '@/components/pages/login'
import { Button } from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'

jest.mock('@/core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLoginRedirect: jest.fn(),
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Login />)).toMatchSnapshot()
  })

  describe('loginHandler', () => {
    it('should correctly call redirect on click', () => {
      const wrapper = shallow(<Login />)

      wrapper.find(Button).first().simulate('click')

      expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
    })
  })
})
