import * as React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../login'

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
  getTokenFromQueryString: jest.fn(),
  getSessionCookie: jest.fn(),
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})
