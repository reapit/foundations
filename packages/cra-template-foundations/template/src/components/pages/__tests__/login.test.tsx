import * as React from 'react'
import { shallow } from 'enzyme'
import { Button } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Login } from '../login'

jest.mock('../../../core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLoginRedirect: jest.fn(),
  },
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('loginHandler', () => {
  it('should correctly call redirect on click', () => {
    const wrapper = shallow(<Login />)

    wrapper.find(Button).first().simulate('click')

    expect(reapitConnectBrowserSession.connectLoginRedirect).toHaveBeenCalledTimes(1)
  })
})
